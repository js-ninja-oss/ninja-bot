User = require('../models/user')

module.exports = robot => {
  robot.hear(/ninja/i, res => {
    return res.send('ninja!');
  });

  robot.hear(/test/i, res => {
    const brainUsers = Object.values(robot.brain.data.users);
    brainUsers.forEach(brainUser => {
      const user = User.find(robot.brain, brainUser.id);
      console.log(user);
    });

    return res.send('ninja!');
  });
};
