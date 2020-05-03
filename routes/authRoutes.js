const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const isLoggedOut = require("../middlewares/isLoggedOut");
const { filterFields } = require("../utils/responseUtils");

module.exports = app => {
  app.get(
    "/auth/google",
    isLoggedOut,
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    isLoggedOut,
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(filterFields(req.user, ["id", "credits"]));
  });

  app.get("/api/logout", requireLogin, (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
