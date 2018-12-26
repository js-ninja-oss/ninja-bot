User = require('../models/user')

module.exports = robot => {
  robot.hear(/ninja/i, res => {
    return res.send('ninja!');
  });

  robot.hear(/kick me\?/i, res => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    let message;
    const {name, prCountMonth} = user.github;
    if (prCountMonth > 1) {
      message = 'No! ';
    } else {
      message = 'Yes! ';
    }
    message += `${name}'s' PR count is ${prCountMonth} in this Month`;

    return res.send(message);
  });
};
