const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const {calendar} = require("./calendarconfig");
const http = require("http");
const fs = require("fs");
const https = require("https");
const { WebClient } = require("@slack/web-api");
const cors = require("cors");
const {google} = require("googleapis");

app.use(cors());
app.use(express.json());
require("dotenv").config();

const options = {
  key: fs.readFileSync("client-key.pem"),
  cert: fs.readFileSync("client-cert.pem"),
};


const client_id = process.env.VITE_SLACK_CLIENT_ID 
const client_secret = process.env.SLACK_CLIENT_SECRET 
const redirect_uri = "https://localhost:443/auth/redirect";

const client = new WebClient();

app.get("/auth/redirect", async (req, res) => {
  try {
    const { code } = req.query;

    // Specify additional scopes here
    const additionalScopes = "identity.basic,identity.email,openid,profile";

    // Exchange the code for an OAuth token
    const result = await client.oauth.v2.access({
      code,
      client_id,
      client_secret,
      redirect_uri,
      scope: additionalScopes, 
    });

    console.log("OAuth Response", result);

    // Use the token to get user information
    const userDataResponse = await client.users.identity({
      user: result.authed_user.id,
      token: result.authed_user.access_token,
    });

    console.log("User Data", userDataResponse);

    res.redirect("http://localhost:3000/oauthdone?code=1234");
  } catch (error) {
    console.error("Error during OAuth process:", error);
    res.status(500).send("Something went wrong!");
  }
});


// https.createServer(options, app).listen(443);
http.createServer(app).listen(10000);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.city");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error inserting data");
    console.error("Error executing query:", error);
  }
});


app.get("/create-event", async (req, res) => {
  console.log(calendar)
  let newEvent = {
    summary: "hello world",
    location: "London, UK",
    startDateTime: "2023-11-25T10:00:00",
    endDateTime: "2023-11-25T17:00:00",
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

  res.send("at least something")
})

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
      console.log("No upcoming events found.");
      res.status(404).send("No upcoming events found.");
      return;
    }

    console.log("Upcoming 10 events:");
    events.forEach((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });

    res.status(200).json(events); // Or return these events in the response
  } catch (error) {
    console.error("Error fetching events:", error);
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


// app.get("/subscribe", async (req, res) => {

// })
// const PORT = process.env.PORT || 3500;

// app.listen(PORT, () => {
//   console.log("Server is running on port:", PORT)
// })