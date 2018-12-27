const User = require('../models/user');

module.exports = (robot) => {
  robot.hear(/dm ask github/i, () => {
    User.noGithub(robot.brain).forEach((user) => {
      robot.messageRoom(user.id, 'Please tell me your GitHub acount by saying like "user github ggtmtmgg"');
    });
  });
};
