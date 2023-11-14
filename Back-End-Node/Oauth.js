// Import the GoogleStrategy and passport modules
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// Configure the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      // Google API credentials obtained from the Google Developer Console
      clientID:
        "149791645078-g4toaougdp9aini8f2bog32f9penkl2v.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:10000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // Callback function called after successful authentication
      // It passes the user profile to the callback (cb) function
      return cb(null, profile);
    }
  )
);

// Serialize and Deserialize user for session management
passport.serializeUser((user, done) => {
  // Serialize user data into the session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user data from the session
  done(null, user);
});

// Export the configured passport object for use in other parts of the application
module.exports = passport;
