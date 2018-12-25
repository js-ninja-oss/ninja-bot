User = require('../models/user')

module.exports = robot => {
  robot.hear(/ninja/i, res => {
    return res.send('ninja!');
  });

  robot.hear(/test/i, res => {
    console.log(User.allWithEmpty(robot.brain));
    return res.send('ninja!');
  });
};
