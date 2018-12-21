const Repo = require('../models/repo');
const ghClient = require('../api-clients/github');

module.exports = class Pr {
  constructor(obj) {
    this.authorUrl = obj.author.url.replace('https://github.com/', '');
    this.url = obj.url;
    this.state = obj.state;
    this.repoNameWithOwner = obj.repository.nameWithOwner;
    this.createdAt = obj.createdAt;
  }

  // TODO: 期間を指定できるようにする
  static async all(brain) {
    const repos = Repo.all(brain);
    let prs = [];

    for (const repo of repos){
      const ghPrs = await ghClient.getPrs(`${repo.owner}/${repo.name}`);
      prs = prs.concat(ghPrs.map(ghPr => new Pr(ghPr.node)));
    }
    return prs;
  }

  static async byMember(brain) {
    // TODO: filter by member
    const prs = await Pr.all(brain);
    const repos = Repo.all(brain);
  }

}
