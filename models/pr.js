const User = require('../models/user');
const ghClient = require('../api-clients/github');

const dateToMonth = date => date.getYear() * 12 + date.getMonth();

module.exports = class Pr {
  constructor(obj) {
    this.author = obj.author.url.replace('https://github.com/', '');
    this.url = obj.url;
    this.state = obj.state;
    this.repoNameWithOwner = obj.repository.nameWithOwner;
    this.createdAt = obj.createdAt;
  }

  static async all(brain) {
    const ghNames = User.allGhNames(brain);
    let prs = [];
    for (const ghName of ghNames){
      prs = prs.concat(await Pr.byUser(ghName));
    }
    return prs;
  }

  static async byUser(ghName) {
    const ghPrs = await ghClient.userPrs(ghName);
    return ghPrs.map(ghPr => new Pr(ghPr.node));
  }

  static async filterThisMonth(prs) {
    const thisMonth = dateToMonth(new Date());
    return prs.filter(pr => dateToMonth(new Date(pr.createdAt)) === thisMonth);
  }

  static async byMember(brain) {
    // TODO: filter by member
    const prs = await Pr.all(brain);
    const repos = Repo.all(brain);
  }

}
