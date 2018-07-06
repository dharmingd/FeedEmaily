const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const validateCredits = require('../middlewares/validateCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select('-recipients');
    res.send(surveys);
  });

  app.get('/api/survey/:surveyId/:choice', (req, res) => {
    res.send('Thank for your feedback!!');
  });

  app.post('/api/surveys/webhook', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    console.log(req.body);
    const events = _.map(req.body, ({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    });

    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    console.log('asdasdasdasdasd');
    console.log(uniqueEvents);

    _.map(uniqueEvents, ({ surveyId, choice, email }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    });
    res.send({});
  });

  app.post('/api/surveys', requireLogin, validateCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      /*recipients: recipients.split(',').map(email => {
        return { email: email };
      })*/
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
