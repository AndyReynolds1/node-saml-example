module.exports = function(req, res, next) {

    // Get session
    var sess = req.session;

    // Check if user logged in
    if (!sess.loggedIn || sess.loggedIn != true) {
        // Not logged in
        res.redirect("/login");
        return;
    }

    next();
};