const User = require('../models/user');
const ghClient = require('../api-clients/github');

const dateToMonth = date => date.getYear() * 12 + date.getMonth();
const filterMonth = prs => {
  const thisMonth = dateToMonth(new Date());
  return prs.filter(pr => dateToMonth(new Date(pr.createdAt)) === thisMonth);
}

module.exports = class Pr {
  constructor(obj) {
    this.author = obj.author.url.replace('https://github.com/', '');
    this.url = obj.url;
    this.title = obj.title;
    this.state = obj.state;
    this.repoNameWithOwner = obj.repository.nameWithOwner;
    this.createdAt = obj.createdAt;
  }

  static async byUser(user) {
    const prs = await ghClient.userPrs(user.ghName);
    return prs.map(pr => new Pr(pr.node));
  }

  static async updatePrCount(brain, user, onFinish) {
    const ghPrs = await Pr.byUser(user);
    const ghPrsMonth = filterMonth(ghPrs);
    user.ghPrs = ghPrs.map(pr => pr.url);
    user.ghPrCount = ghPrs.length;
    user.ghPrsMonth = ghPrsMonth.map(pr => pr.url);
    user.ghPrCountMonth = ghPrsMonth.length;
    user.save(brain);
    onFinish(user);
  }
}
