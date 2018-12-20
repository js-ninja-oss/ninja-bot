const User = require('../models/user');

module.exports = robot => {
  robot.hear(/user github (\w*)/i, res => {
    const github = res.match[1];
    const userId = res.message.user.id;
    User.updateGithub(robot.brain, userId, github)
    return res.send('I set your github account as @' + github + '.');
  });

  return robot.hear(/user info/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    let reply;
    if (user.github) {
      reply = `I your github account is @${user.github}.`;
    } else {
      reply = 'tell me your account by saying "user github AccountName"';
    }
    return res.send(reply);
  });
};
