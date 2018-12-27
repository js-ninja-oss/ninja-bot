const User = require('../models/user');

module.exports = (robot) => {
  // TODO: ['all', 'me'] を引数にして統合する
  robot.commands.push('ninja crawl all - Crawls all user\'s GitHub account.');
  robot.hear(/ninja crawl all/i, (res) => {
    const users = User.all(robot.brain);
    users.map(user => user.updatePrs(robot.brain, res));
  });

  robot.commands.push('ninja crawl me - Crawls your GitHub account.');
  robot.hear(/ninja crawl me/i, (res) => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    user.updatePrs(robot.brain, res);
  });
};
