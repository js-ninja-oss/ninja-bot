const ghClient = require('../api-clients/github');

const dateToMonth = date => date.getYear() * 12 + date.getMonth();
const filterMonth = (prs) => {
  const thisMonth = dateToMonth(new Date());
  return prs.filter(pr => dateToMonth(new Date(pr.createdAt)) === thisMonth);
};

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
    const prs = await ghClient.userPrs(user.github.name);
    return prs.map(pr => new Pr(pr.node));
  }

  static async updatePrCount(brain, user, onFinish) {
    const ghPrs = await Pr.byUser(user);
    const ghPrsMonth = filterMonth(ghPrs);
    user.github.prs = ghPrs.map(pr => pr.url);
    user.github.prCount = ghPrs.length;
    user.github.prsMonth = ghPrsMonth.map(pr => pr.url);
    user.github.prCountMonth = ghPrsMonth.length;
    user.save(brain);
    onFinish(user);
  }
};
