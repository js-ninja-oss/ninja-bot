const User = require('../models/user');
const Pr = require('../models/pr');

module.exports = robot => {
  robot.hear(/user github (\w*)/i, res => {
    const ghName = res.match[1];
    const userId = res.message.user.id;
    User.updateGhName(robot.brain, userId, ghName)
    return res.send('I set your github account as @' + ghName + '.');
  });

  return robot.hear(/user info/i, res => {
    const slackId = res.message.user.id;
    const user = User.find(robot.brain, slackId);
    return res.send(user.info());
  });

  return robot.hear(/user prs/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    let reply;
    if (user.ghPrCount) {
      reply = `Your this month's pr count is @${user.ghPrCount}.`;
    } else {
      reply = 'tell me your account by saying "user github AccountName"';
    }
    return res.send(reply);
  });
};
