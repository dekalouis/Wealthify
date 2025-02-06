//midlewaress
const isAdmin = function (req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    next(); // Proceed if admin
  } else {
    const error = "You are not an admin!";
    res.redirect(`/login?error=${error}`);
  }
};
const isLoggedIn = function (req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    const error = "Please Login First!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};
const redirectIfLoggedIn = function (req, res, next) {
  if (req.session.user) {
    return res.redirect("/companies");
  }
  next();
};

module.exports = { isAdmin, isLoggedIn, redirectIfLoggedIn };
