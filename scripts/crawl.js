const User = require('../models/user');

module.exports = robot => {
  robot.hear(/crawl start/i, res => {
    const allUser = User.all();
    for(user in allUser) user.updatePrs(robot.brain, res);
  });

  robot.hear(/crawl myself/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    user.updatePrs(robot.brain, res);
  });
};
