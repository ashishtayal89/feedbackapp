const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

module.exports = (req, _res, next) => {
  const p = new Path("/api/surveys/:surveyId/:choice");
  req.body = _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .value();
  next();
};
