const User = require('../models/user');

module.exports = robot => {
  robot.hear(/crawl all/i, res => {
    const users = User.all(robot.brain);
    users.map(user => user.updatePrs(robot.brain, res));
  });

  robot.hear(/crawl me/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    user.updatePrs(robot.brain, res);
  });
};
