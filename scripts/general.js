User = require('../models/user')

module.exports = robot => {
  robot.hear(/ninja/i, res => {
    return res.send('ninja!');
  });

  robot.hear(/reset khatbehu/i, res => {
    robot.brain.remove('users');
    return res.send('reset!');
  });
};
