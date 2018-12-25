const User = require('../models/user');
const Pr = require('../models/pr');

module.exports = robot => {
  robot.hear(/user github (\w*)/i, res => {
    const ghName = res.match[1];
    const userId = res.message.user.id;
    User.updateGhName(robot.brain, userId, ghName)
    return res.send('I set your github account as @' + ghName + '.');
  });

  robot.hear(/user all/i, res => {
    const users = User.all(robot.brain);
    const replay = users.map(user => user.info()).join("\n--------\n");
    return res.send(replay);
  });

  robot.hear(/user me/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    return res.send(user.info());
  });

  robot.hear(/user no github/i, res => {
    const users = User.noGithub(robot.brain);
    const replay = users.map(user => user.info()).join("\n--------\n");
    return res.send(replay);
  });
};
