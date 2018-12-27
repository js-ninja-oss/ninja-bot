const User = require('../models/user');

module.exports = (robot) => {
  robot.commands.push('ninja dm ask github - Sends DM to users still don\'t register their GitHub account.');
  robot.hear(/ninja dm ask github/i, () => {
    User.noGithub(robot.brain).forEach((user) => {
      robot.messageRoom(user.id, 'Please tell me your GitHub acount by saying like "ninja github ggtmtmgg"');
    });
  });
};
