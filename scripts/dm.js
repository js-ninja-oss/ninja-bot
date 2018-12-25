const User = require('../models/user');

module.exports = robot => {
  robot.hear(/dm ask github/i, res => {
    User.allIds(robot.brain).forEach(slackId => {
      if (slackId === 'UD08Z6LPP') { // TODO: remove condition
        robot.messageRoom(slackId, 'Please tell me your GitHub acount by "user github AccountName"');
      }
    });
  });
};
