const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
} = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken = accessToken
    profile.refreshToken = refreshToken
    return cb(null, profile);
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    return done(null, false, { message: 'Invalid username or password' });
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
    //   if (!user.verifyPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
    //   return done(null, user);
    // });
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
