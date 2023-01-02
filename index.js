const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const xhub = require('express-x-hub');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');

const authRoutes = require('./routes/auth.js');
const facebookRoutes = require('./routes/facebook.js');
const webhookRoutes = require('./routes/webhook.js');

const PORT = process.env.PORT || 3001;

if (config.USE_LOCALHOST_SSL) {
  var fs = require("fs");
  var https = require("https");
  var key = fs.readFileSync("localhost-key.pem", "utf-8");
  var cert = fs.readFileSync("localhost.pem", "utf-8");
}

const app = express();

app.use(xhub({ algorithm: 'sha1', secret: config.facebookAuth.clientSecret }));
app.use(bodyParser.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.SESSION_SECRET
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: config.client.url, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: config.facebookAuth.callbackURL
}, function (accessToken, refreshToken, profile, done) {
  return done(null, {
    accessToken: accessToken,
    user: profile
  });
}
));

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

app.use('/fb', authCheck, facebookRoutes);

app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

app.use('/', webhookRoutes);

if (!config.USE_LOCALHOST_SSL) {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
} else {
  https.createServer({ key, cert }, app).listen(PORT);
}
