const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const { calendar } = require("./calendarconfig");
const http = require("http");
const fs = require("fs");
const https = require("https");
const { WebClient } = require("@slack/web-api");
const cors = require("cors");
const { google } = require("googleapis");
const { Console } = require("console");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const frontendUrl = process.env.FRONT_END_URL;
const verifyToken = require("./verifyToken");
const verifyAdminToken = require("./verifyAdminToken.js");

const {
  getSignUpDetailsFromDatabase,
  cancelSignUp,
  insertSignUp,
} = require("./helpers.js");

app.use(cors());
app.use(express.json());
require("dotenv").config();
const client_id = process.env.VITE_SLACK_CLIENT_ID;
const client_secret = process.env.SLACK_CLIENT_SECRET;
const redirect_uri = `${process.env.BACK_END_URL_SLACK}/auth/redirect`;
const client = new WebClient();

const createToken = (userId, role) => {
  // TODO: it is confusing at the moment that we are using Slack title as the role here
  const token = jwt.sign({ id: userId, roles: role }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  return token;
};

app.get("/auth/redirect", async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange the code for an OAuth token
    const result = await client.oauth.v2.access({
      code,
      client_id,
      client_secret,
      redirect_uri,
    });

    // Use the token to get user information
    const userProfile = await client.users.profile.get({
      user: result.authed_user.id,
      token: result.authed_user.access_token,
    });

    const existingUser = await pool.query(
      "SELECT * FROM person WHERE slack_email = $1",
      [userProfile["profile"]["email"]]
    );

    let jwtToken = "";

    if (existingUser.rows.length > 0) {
      jwtToken = createToken(
        existingUser.rows[0]["id"],
        existingUser.rows[0]["slack_title"]  // TODO: weird that title = jwt role
      );

      // TODO: update values if changed
      // // Update avatar if it has changed
      // if (existingUser.rows[0]["avatar"] !== userProfile["profile"]["image_original"]) {
      //   await pool.query("UPDATE person SET avatar = $1 WHERE id = $2", [
      //     userProfile["profile"]["image_original"],
      //     existingUser.rows[0]["id"],
      //   ]);
      // }
    } else {
      // Insert the new user into the database
      var insertResult = await pool.query(
        "INSERT INTO person (slack_photo_link, slack_firstname, slack_lastname, slack_email, slack_title) VALUES ($1, $2, $3, $4, $5) RETURNING id, slack_title",
        [
          userProfile["profile"]["image_original"],
          userProfile["profile"]["first_name"],
          userProfile["profile"]["last_name"],
          userProfile["profile"]["email"],
          userProfile["profile"]["title"],
        ]
      );
      jwtToken = createToken(
        insertResult.rows[0]["id"],
        insertResult.rows[0]["slack_title"]  // TODO: weird that title = jwt role
      );
    }

    // redirect back to frontend so that it can run setSession with this token
    res.redirect(`${frontendUrl}/oauthdone?code=${jwtToken}`);
  } catch (error) {
    console.error("Error during OAuth process:", error);
    res.status(500).send("Something went wrong!");
  }
});

const options = {
  key: fs.readFileSync(`${__dirname}/client-key.pem`),
  cert: fs.readFileSync(`${__dirname}/client-cert.pem`),
};
if (process.env.LOCAL_DEVELOPMENT) {
  // Slack requires https for OAuth, but locally we want to use http
  // to avoid having to maintain our own certificates
  https.createServer(options, app).listen(443);
  http.createServer(app).listen(10000);
} else {
  // when we deploy on Vercel, Vercel adds HTTPS for us, so we can just use one port
  //console.log("PRODUCT");
  https.createServer(options, app).listen(10000);
}

//cities
app.get("/cities", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM region");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching city data");
    console.error("Error executing query:", error);
  }
});

app.get("/create-event", async (req, res) => {
  //console.log(calendar);
  let newEvent = {
    summary: "hello world",
    location: "London, UK",
    startDateTime: "2023-12-02T10:00:00",
    endDateTime: "2023-12-02T17:00:00",
  };

  await calendar.events.insert({
    // auth: oauth2Client,
    calendarId:
      "4c572a675834bb44f3c7a1cd40456214e4a2a75fa67a890e40212effcd7d9989@group.calendar.google.com",
    requestBody: {
      summary: newEvent.summary,
      location: newEvent.location,
      // attendees: [
      //   {
      //     email: "jonathanzheng8888@gmail.com",
      //   },
      // ],
      colorId: "7",
      start: {
        dateTime: new Date(newEvent.startDateTime),
      },
      end: {
        dateTime: new Date(newEvent.endDateTime),
      },
    },
  });

  res.send("at least something");
});

app.get("/events", async (req, res) => {
  try {
    const calendarResponse = await calendar.events.list({
      calendarId:
        "4c572a675834bb44f3c7a1cd40456214e4a2a75fa67a890e40212effcd7d9989@group.calendar.google.com",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = calendarResponse.data.items;
    if (!events || events.length === 0) {
      //console.log("No upcoming events found.");
      res.status(404).send("No upcoming events found.");
      return;
    }

    //console.log("Upcoming 10 events:");
    events.forEach((event, i) => {
      const start = event.start.dateTime || event.start.date;
      //console.log(`${start} - ${event.summary}`);
    });

    res.status(200).json(events);
  } catch (error) {
    //console.error("Error fetching events:", error);
    res.status(500).send("Error fetching events");
  }
});

//fetching only saturdays events
// const currentDate = new Date();
// const today = currentDate.getDay(); // Get the current day of the week

// // Calculate the date for the first upcoming Saturday
// const firstSaturday = new Date(currentDate.getTime());
// const daysUntilSaturday = 6 - today; // Days until the next Saturday
// firstSaturday.setDate(firstSaturday.getDate() + daysUntilSaturday);

// // Array to store start and end dates for three Saturdays
// const saturdays = [];
// for (let i = 0; i < 3; i++) {
//   const startDate = new Date(firstSaturday.getTime());
//   startDate.setDate(startDate.getDate() + i * 7); // Increment by a week for each Saturday

//   const endDate = new Date(startDate.getTime());
//   endDate.setDate(endDate.getDate() + 1); // One day after the start date (i.e., Sunday)

//   saturdays.push({ startDate, endDate });
// }

// // Retrieve events for each of the three Saturdays
// saturdays.forEach(({ startDate, endDate }) => {
//   calendar.events.list(
//     {
//       calendarId: "primary",
//       timeMin: startDate.toISOString(),
//       timeMax: endDate.toISOString(),
//       singleEvents: true,
//       orderBy: "startTime",
//     },
//     (err, res) => {
//       if (err) {
//         console.error("Error fetching events:", err);
//         return;
//       }
//       const events = res.data.items;
//       if (events.length) {
//         console.log(
//           `Events on ${startDate.toLocaleDateString("en-US", {
//             weekday: "long",
//           })}:`
//         );
//         events.forEach((event) => {
//           console.log(`${event.summary} - ${event.start.dateTime}`);
//         });
//       } else {
//         console.log(
//           `No events found on ${startDate.toLocaleDateString("en-US", {
//             weekday: "long",
//           })}.`
//         );
//       }
//     }
//   );
// });

//Profile endpoint
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user profile details from the database
    const userProfile = await pool.query(
      "SELECT id, slack_first_name, slack_last_name, slack_email, default_role, slack_photo_link FROM person WHERE id = $1",
      [userId]
    );

    if (userProfile.rows.length === 0) {
      // User not found
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the user's profile details
    res.status(200).json({
      id: userProfile.rows[0].id,
      first_name: userProfile.rows[0].slack_first_name,
      last_name: userProfile.rows[0].slack_last_name,
      email: userProfile.rows[0].slack_email,
      // default_role: userProfile.rows[0].default_role_id,
      avatar: userProfile.rows[0].slack_photo_link,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Delete by id from signup classes
app.get("/cancel-signup/:sessionId", verifyToken, async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const userId = req.userId;
    console.log(sessionId, "  and  ", userId)
    await cancelSignUp(sessionId, userId);

    res.json({ success: true });
  } catch (error) {
    console.error("Error canceling sign-up:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/insert-signup", verifyToken, async (req, res) => {
  try {
    const sessionId = req.body.sessionId;
    const userId = req.userId;
    const role = req.body.role;

    await insertSignUp(sessionId, role, userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error insert sign-up:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// fixes "No exports found in module" error
// https://stackoverflow.com/questions/75565239/no-exports-found-in-module-error-when-deploying-express-rest-api-on-vercel

//Profile endpoint
app.get("/signup-details", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const signUpDetails = await getSignUpDetailsFromDatabase(userId);
    //console.log(signUpDetails)
    res.json(signUpDetails.rows);
    
  } catch (error) {
    console.error("Error fetching sign-up details:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/insert-signup", verifyToken, async (req, res) => {
  try {
    const sessionId = req.body.sessionId;
    const userId = req.userId;
    const role = req.body.role;

    await insertSignUp(sessionId, role, userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error insert sign-up:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

//session table
app.get("/session", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        session.id,
        session.date,
        session.time_start,
        session.time_end,
        'Barath' AS who_leading,
        cohort.name AS cohort,
        'London' AS city,
        session.location,
        lesson_content.module AS module_name,
        lesson_content.week_no AS module_week,
        lesson_content.syllabus_link
      FROM session
      JOIN lesson_content
      ON session.lesson_content_id = lesson_content.id
      JOIN cohort
      ON session.cohort_id = cohort.id;
    `);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching session data");
    console.error("Error executing query:", error);
  }
});
app.post("/session", async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO session(date, time_start, time_end, event_type, location, lesson_content_id, cohort_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [new Date(), new Date(), new Date(), "Technical Education", "London", 1, 1]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});
app.post("/lesson_content", async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO lesson_content(module, module_no, week_no, lesson_topic, syllabus_link) VALUES ( $1, $2, $3, $4, $5)",
      ["Databases", 3, 1, "Test Topic", "codeyourfuture.com"]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

//see attendee all voluteer for the session
app.get("/attendance/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;
  try {
    const result = await pool.query(
      "SELECT person.slack_first_name, person.slack_last_name, role.name FROM attendance JOIN person ON attendance.person_id = person.id JOIN role ON attendance.role_id = role.id JOIN session ON attendance.session_id = session.id WHERE session.id = $1;",
      [sessionId]
    );

    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching attendance data");
    console.error("Error executing query:", error);
  }
});

app.get("/roles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM role");

    const roles = result.rows.map((role) => ({ id: role.id, name: role.role }));

    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default app;
