const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const http = require("http");
const fs = require("fs");
const https = require("https");
const { WebClient } = require("@slack/web-api");
const cors = require("cors");

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


https.createServer(options, app).listen(443);
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


////sign up
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password, city, role } = req.body;

    // Check if the user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO users (username, email, password, city, role) VALUES ($1, $2, $3, $4, $5)",
      [username, email, hashedPassword, city, role]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});


const port = process.env.PORT || 10000;
