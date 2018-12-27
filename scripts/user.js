const User = require('../models/user');

const userFlg = (text) => {
  const args = text.split(' ');

  const flg = {
    '--github': false,
    '--pr-url': false,
  };

  args.forEach((v) => {
    flg[v] = true;
  });
  return flg;
};

module.exports = (robot) => {
  robot.hear(/user github (\w*)/i, (res) => {
    const ghName = res.match[1];
    const userId = res.message.user.id;
    User.updateGhName(robot.brain, userId, ghName);
    return res.send(`I set your github account as @${ghName}.`);
  });

  robot.hear(/user all(\s?[-\w]*){0,}/i, (res) => {
    const flg = userFlg(res.message.text);

    const users = User.all(robot.brain);
    const userInfos = users.map(user => user.info(flg)).filter(v => v);

    if (userInfos.length === 0) {
      return res.send('No one registerd...');
    }

    return res.send(userInfos.join('\n--------\n'));
  });

  robot.hear(/user me(\s?[-\w]*){0,}/i, (res) => {
    const flg = userFlg(res.message.text);

    const userId = res.message.user.id;
    const user = User.find(robot.brain, userId);
    return res.send(user.info(flg));
  });

  robot.hear(/user no github/i, (res) => {
    const flg = userFlg(res.message.text);

    const users = User.noGithub(robot.brain);
    const replay = users.map(user => user.info(flg)).join('\n--------\n');
    return res.send(replay);
  });
};
