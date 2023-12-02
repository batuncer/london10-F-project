const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
];

const auth = new google.auth.JWT({
  subject: "classplanner@class-planner-405420.iam.gserviceaccount.com", // specify subject (user whose context you want to operate in)
  // keyFile: "class-planner-405420-b843859e2fe3.json",
  keyFile: JSON.parse(process.env.CALENDAR),
  scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth: auth });

module.exports = {calendar}




// app.get("/calendar", (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
//   res.redirect(url);
// });

// app.get("/calendar/redirect", async (req, res) => {
//   const code = req.query.code;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   res.redirect("http://localhost:3000");
//   console.log(code);
// });

// const PORT = process.env.PORT || 3500;

// app.listen(PORT, () => {
//   console.log("Server is running on port:", PORT);
// });
