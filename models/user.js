const Pr = require('./pr');

module.exports = class User {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.realName = obj.realName;
    this.github = obj.github || {
      name: '',
      prCount: -1,
      prs: [],
      prCountMonth: -1,
      prsMonth: [],
    };
    this.slack = obj.slack || {}
  }

  static find(brain, id) {
    const users = brain.get('users');
    if (users && users[id]) return new User(users[id]);
    const user = new User(brain.userForId(id));
    user.save(brain);
    return user;
  }

  static all(brain) {
    const userIds = Object.keys(brain.data.users);
    return userIds.map(userId => User.find(brain, userId));
  }

  static noGithub(brain) {
    return User.all(brain).filter(user => !user.github.name)
  }

  static allGhNames(brain) {
    return User.all(brain).map(user => user.github.name);
  }

  static updateGhName(brain, id, ghName) {
    const user = User.find(brain, id);
    if (!user.github) user.github = {};
    user.github.name = ghName;
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
    if (this.github.name) return `
      ID: ${this.id}
      Slack: \`@${this.slack.name}\`
      GitHub: \`@${this.github.name}\`
      PR(All Time): ${this.github.prCount}
      PR Count(This Month): ${this.github.prCountMonth}
      PR(This Month):
      ${this.github.prsMonth.join('\n')}
    `;
    return 'Set github name by "user github AccuntName"';
  }

  save(brain) {
    let users = brain.get('users');
    if (!users) users = {};
    users[this.id] = this;
    brain.set('users', users);
  }
}
