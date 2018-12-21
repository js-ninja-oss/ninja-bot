const User = require('../models/user');
const Pr = require('../models/pr');

module.exports = robot => {
  robot.hear(/user github (\w*)/i, res => {
    const ghName = res.match[1];
    const userId = res.message.user.id;
    User.updateGhName(robot.brain, userId, ghName)
    return res.send('I set your github account as @' + ghName + '.');
  });

  return robot.hear(/user all/i, res => {
    const users = User.all(robot.brain);
    const replay = users.map(user => user.info()).join("\n--------\n");
    return res.send(replay);
  });

  // TODO: 何故か3つめ以降のhearを拾えない
  return robot.hear(/user me/i, res => {
    const slackId = res.message.user.id;
    const user = User.find(robot.brain, slackId);
    return res.send(user.info());
  });
};
