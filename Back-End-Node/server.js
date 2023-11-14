const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const passport = require("./Oauth"); // Import the configured passport object
const session = require("express-session");

app.use(express.json());
require("dotenv").config();


// Set up session middleware with required options
app.use(session({ secret: "123", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// Route to display a link for Google login
app.get("/login", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

// Route for initiating Google OAuth authentication
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after successful Google authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/failure",
  })
);

// Profile route accessible only when logged in
app.get("/profile", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

// Failure route for unsuccessful authentication
app.get("/failure", (req, res) => {
  res.send("Fail");
});

// Logout route to log the user out
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return;
    res.send("Logout succeeded");
  });
});

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
