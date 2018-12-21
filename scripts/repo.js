const Repo = require('../models/repo');

module.exports = robot => {
  robot.hear(/repo add (.*)/i, res => {
    const nameWithOwner = res.match[1];
    Repo.add(robot.brain, nameWithOwner)
    return res.send(`I added ${nameWithOwner} to repos list.`);
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
