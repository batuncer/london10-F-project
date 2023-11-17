const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const http = require("http");
const fs = require("fs");
const https = require("https");
const fetch = require("node-fetch");
app.use(express.json());
require("dotenv").config();

const options = {
  key: fs.readFileSync("client-key.pem"),
  cert: fs.readFileSync("client-cert.pem"),
};
// app.use(function (req, res, next) {
//   res.writeHead(200);
//   res.end("hello world\n");
//   next();
// });

const { WebClient } = require("@slack/web-api");
const client = new WebClient();
const client_id = process.env.VITE_SLACK_CLIENT_ID;
const client_secret = process.env.SLACK_CLIENT_SECRET;
app.get("/auth/redirect", async (req, res) => {
  // TODO: verify state parameter
  try {
    const query = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: `code=${req.query.code}&client_id=${client_id}&client_secret=${client_secret}`,
    };
    const authResponse = await fetch(
      "https://slack.com/api/oauth.v2.access",
      query
    );
    const authJson = await authResponse.json();

    console.log("authJson", authJson);

    const userDataResponse = await fetch(
      `https://slack.com/api/users.identity?user=${authJson.authed_user.id}`,
      {
        headers: {
          Authorization: `Bearer ${authJson.authed_user.access_token}`,
        },
      }
    );
    const userDataJson = await userDataResponse.json();

    console.log("userDataJson", userDataJson);

    res.redirect("http://localhost:3000/oauthdone?code=1234");
    //res.status(200).send("You've logged in with your Slack account!");
  } catch (e) {
    console.log(e);
    res.status(500).send("Something wrong!");
  }
});
app.post("/auth", async (req, res, next) => {
  const { code } = req.body;
  const { VITE_SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, VITE_REDIRECT_URL } =
    process.env;
  // Validate code with Slack API to get the access token
  const query = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: `code=${code}&client_id=${VITE_SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&redirect_uri=${VITE_REDIRECT_URL}`,
  };
  const authResponse = await fetch(
    "https://slack.com/api/oauth.v2.access",
    query
  );
  const authJson = await authResponse.json();

  // Once we have the code we can use it with the Slack API to get the user data
  const userDataResponse = await fetch(
    `https://slack.com/api/users.identity?user=${authJson.authed_user.id}`,
    {
      headers: { Authorization: `Bearer ${authJson.authed_user.access_token}` },
    }
  );
  const userDataJson = await userDataResponse.json();
  /*
        userDataJson
        {
            ok: true,
            user: { name: 'my.name', id: 'xxxxx' },
            team: { id: 'xxxxx' }
        }
    */
  // You decide how save the response to the Database
  // e.g. Model.save({ user_id: user.id, token: authJson.authed_user.access_token })
  // You can return a JWT token to the frontend to use it in the future
  console.log(userDataJson);
  res.send({ message: "ok" });
  next();
});
https.createServer(options, app).listen(443);

http.createServer(app).listen(10000);

//GET method below just to test if the server is running, when you create an endpoint you can delete this
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.city");
    //I received the output '{"user":"postgres"}' without 'public' preceding 'user' because PostgreSQL defaults to a behavior where referencing a 'user' table without specifying a schema results in the default system view or object named 'user' being referenced inadvertently. To explicitly refer to the 'user' table, I utilized the table's schema name or qualified the table name with the schema where it exists.
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error inserting data");
    console.error("Error executing query:", error);
  }
});
const port = process.env.PORT || 10000;
