var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");
var app = express();
var port = process.env.PORT;

// Templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

// Body parser settings
app.use(bodyParser.urlencoded({ extended: false }));

// Set session options
app.use(session({
    secret: "SecretString",
    resave: true,
    saveUninitialized: false
}));

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

// Allow tamplates to have access to session
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// Set route for static content
app.use(express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + "/public"));

// Routes
app.use(require("./routes"));

// Start server
app.listen(port,function(){
  console.log("Live at Port " + port);
});
