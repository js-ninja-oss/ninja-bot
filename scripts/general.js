const User = require('../models/user');

module.exports = (robot) => {
  robot.commands.push('ninja - Replys ninja!');
  robot.hear(/ninja hello/i, res => res.send('hello!'));

  robot.commands.push('ninja help - Displays all of the help commands that this bot knows about.');
  robot.hear(/(ninja help|help)/i, (res) => {
    const commands = robot.commands.filter(c => c.includes('ninja'));
    return res.send(commands.join('\n'));
  });

  robot.commands.push('ninja kick me? - Tells you wheather ninja-bot will kick you, or not.');
  robot.hear(/ninja kick me\?/i, (res) => {
    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    let message;
    const { name, prCountMonth } = user.github;
    if (prCountMonth > 1) {
      message = 'No! ';
    } else {
      message = 'Yes! ';
    }
    message += `${name}'s' PR count is ${prCountMonth} in this Month`;

    return res.send(message);
  });
};
