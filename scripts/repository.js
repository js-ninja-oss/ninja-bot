const Repo = require('../models/repo');

module.exports = function (robot) {
  robot.hear(/repo add (.*)/i, function (res) {
    const orgTitle = res.match[1];
    Repo.add(robot.brain, orgTitle)
    return res.send(`I added ${orgTitle} to repos list.`);
  });

  return robot.hear(/repo list/i, function (res) {
    const repos = Repo.all(robot.brain);
    if (repos) {
      reply = repos.join('\n');
    } else {
      reply = 'add repositories by saying "repo add url"';
    }
    return res.send(reply);
  });
};
