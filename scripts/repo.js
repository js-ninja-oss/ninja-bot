const Repo = require('../models/repo');

module.exports = robot => {
  robot.hear(/repo add (.*)/i, res => {
    const orgTitle = res.match[1];
    Repo.add(robot.brain, orgTitle)
    return res.send(`I added ${orgTitle} to repos list.`);
  });

  return robot.hear(/repo list/i, res => {
    const repos = Repo.allUrls(robot.brain);
    if (repos) {
      reply = repos.join('\n');
    } else {
      reply = 'add repositories by saying "repo add url"';
    }
    return res.send(reply);
  });
};
