const GitHub = require('github-api');
const Repo = require('../models/repo');

module.exports = class Pr {
  constructor(obj) {
    this.author = obj.user.login;
    this.url = obj.html_url;
    this.state = obj.state;
    this.repoOrgTitle = obj.base.repo.full_name;
    this.createdAt = obj.created_at;
    this.margedAt = obj.merged_at;
  }

  // TODO: 期間を指定できるようにする
  static async all(brain) {
    const repos = Repo.all(brain);
    const github = new GitHub();
    let prs = [];

    for (const repo of repos){
      const ghRepo = github.getRepo(repo.org, repo.title);
      const opt = { state: 'all' }
      const ghPrs = await ghRepo.listPullRequests(opt)
      console.log('ghPrs', ghPrs);
      prs = prs.concat(ghPrs.map(pr => new Pr(pr)));
    }
    return prs;
  }

  static async byMember(brain) {
    // TODO: filter by member
    const prs = await Pr.all(brain);
    const repos = Repo.all(brain);
  }

}
