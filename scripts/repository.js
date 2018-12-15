module.exports = function (robot) {
  robot.hear(/repo add (.*)/i, function (res) {
    var repos, url;
    url = res.match[1];
    repos = robot.brain.get('repos');
    if (!repos) {
      repos = [];
    }
    repos = repos.concat(url);
    robot.brain.set('repos', repos);
    return res.send('I added ' + url + ' to repos list.');
  });
  return robot.hear(/repo list/i, function (res) {
    var reply, repos;
    repos = robot.brain.get('repos');
    reply = '';
    if (repos) {
      reply = repos.join('\n');
    } else {
      reply = 'add repositories by saying "repo add url"';
    }
    return res.send(reply);
  });
};
