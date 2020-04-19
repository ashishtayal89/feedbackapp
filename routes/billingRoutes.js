const keys = require("../config/keys");
const { filterUserFields } = require("../utils/responseUtils");
const requireLogin = require("../middlewares/requireLogin");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: "inr",
      source: req.body.id,
      description: "Pay for credits"
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(filterUserFields(user, ["id", "credits"]));
  });
};
