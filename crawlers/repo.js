const Repo = require('../models/repo');
const User = require('../models/user');
const GitHub = require('github-api');

module.exports = brain => {
  const repos = Repo.all(brain);
  const users = User.allGithubs(brain);

  const github = new GitHub();

  (async () => {
    for (const repo of repos){
      const ghRepo = github.getRepo(repo.org, repo.title);
      const opt = { state: 'all' }
      const prs = await ghRepo.listPullRequests(opt)
      console.log(prs.data.length);
    }
  })();
}

