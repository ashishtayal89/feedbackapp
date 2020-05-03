const sendgrid = require("sendgrid");
const keys = require("../config/keys");
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey); // provide api key
    this.from_email = new helper.Email("atayal@xebia.com"); // from
    this.addRecipients(recipients.map(({ email }) => new helper.Email(email))); // to
    this.subject = subject; // subject
    this.addContent(new helper.Content("text/html", content)); // body
    this.addClickTracking(); // click tracking
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients(recipients) {
    const personalize = new helper.Personalization();
    recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    try {
      return await this.sgApi.API(request);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = Mailer;
