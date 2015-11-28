var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

// Index
router.get("/", auth, function(req,res){
    console.log(req.user);
    res.render("secure/index", {"page":"secure", user:req.user});
});

module.exports = router;