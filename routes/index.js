var express = require("express");
var router = express.Router();
var passport = require("passport");
var Strategy = require("passport-wsfed-saml2").Strategy;

// Load other routes
router.use("/secure", require("./secure"));

// Set passport settings
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

passport.use(new Strategy({
        wreply: 'https://node-saml-example-stal.c9users.io/login/callback',
        realm: 'https://node-saml-example-stal.c9users.io',
        homeRealm: '', // optionally specify an identity provider to avoid showing the idp selector
        identityProviderUrl: 'http://localhost:8000/STS/Issue/',
        thumbprints: ["313D3B54E2140192A8C7ED626332B6BF9106A9EC"]
    },
    function(profile, done) {
        console.log("Auth with", profile);
        done(null, profile);
    }
));

// Home
router.get("/", function(req, res) {
    res.render("index", {
        "page": "home"
    });
});

// About
router.get("/about", function(req, res) {
    res.render("about", {
        "page": "about"
    });
});

// Login
router.get("/login",
    passport.authenticate("wsfed-saml2", {
        failureRedirect: "/",
        forceAuthn: true
    }),
    function(req, res) {
        req.session.loggedIn = true;
        res.redirect("/secure");
    }
);

// Login callback
router.post("/login/callback",
    passport.authenticate("wsfed-saml2", {
        failureRedirect: "/"
    }),
    function(req, res) {
        req.session.loggedIn = true;
        res.redirect("/secure");
    }
);

// Logout
router.get("/logout", function(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect("/");
});

// Default route to catch 404 errors
router.use("*", function(req, res) {
    res.render("404");
});

module.exports = router;