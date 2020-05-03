const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplates");
const { filterFields, filterListFields } = require("../utils/dataParser");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      return res.send(filterFields(user, ["id", "credits"]));
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error:
          "Somthing wend wrong, survey couldn't be send. We are looking into the issue"
      });
    }
  });
  app.get("/api/surveys", async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id });
    return res.send(
      filterListFields(surveys, ["id", "body", "yes", "no", "dateSent"])
    );
  });
};
