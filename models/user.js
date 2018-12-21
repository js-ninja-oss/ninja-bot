const Pr = require('./pr');

module.exports = class User {
  constructor(obj) {
    this.ghName = obj.ghName;
    this.slackId = obj.slackId;
    this.ghPrCount = obj.ghPrCount || -1;
    this.ghPrCountMonth = obj.ghPrCountMonth || -1;
  }

  static find(brain, slackId) {
    const users = brain.get('users');
    let user = { slackId: slackId };
    if (users && users[slackId]) user = users[slackId];
    return new User(user);
  }

  static all(brain) {
    const users = brain.get('users');
    return Object.values(users).map(user => new User(user))
  }

  static allGhNames(brain) {
    return User.all().map(user => user.ghName);
  }

  static updateGhName(brain, slackId, ghName) {
    const user = User.find(brain, slackId);
    user.ghName = ghName;
    user.save(brain);

    return true;
  }

  async ghPrs(){
    const Pr = require('./pr');
    this.prs = await Pr.byUser(this);
    return this.prs;
  }

  async updatePrs(brain, res){
    const Pr = require('./pr');
    const onFinish = user => res.send(user.info());
    Pr.updatePrCount(brain, this, onFinish)
  }

  info() {
    if (this.ghName) return `
      ID: ${this.slackId}
      GitHub: @${this.ghName}
      PR(All Time): ${this.ghPrCount}
      PR(This Month): ${this.ghPrCountMonth}
    `;
    return 'Set github name by "user github AccountName"';
  }

  save(brain) {
    let users = brain.get('users');
    if (!users) users = {};
    users[this.slackId] = this;
    brain.set('users', users);
  }
}
