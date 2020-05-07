const _ = require("lodash");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const filterSurveys = require("../middlewares/filterSurveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplates");
const {
  filterDataFields,
  filterDataListFields
} = require("../utils/dataParser");

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
      return res.send(filterDataFields(user, ["id", "credits"]));
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
      filterDataListFields(surveys, ["id", "body", "yes", "no", "dateSent"])
    );
  });
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you for your feedback");
  });
  app.post("/api/surveys/webhooks", filterSurveys, (req, res) => {
    _.forEach(req.body, ({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date()
        }
      ).exec();
    });
    res.send({});
  });
};
