const Pr = require('./pr');

module.exports = class User {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.realName = obj.realName;

    const github = obj.github || {};
    this.github = {
      name: github.name,
      prs: github.prs || [],
      prCount: github.prCount || -1,
      prsMonth: github.prsMonth || [],
      prCountMonth: github.prCountMonth || -1,
    }

    const slack = obj.slack || {}
    this.slack = {
      id: slack.id,
      teamId: slack.team_id,
      name: slack.name,
      deleted: slack.deleted,
      color: slack.color,
      realName: slack.real_time,
      tz: slack.tz,
      tzLabel: slack.tz_label,
      tzOffset: slack.tz_offset,
      profile: slack.profile,
      isAdmin: slack.is_admin,
      isOwner: slack.is_owner,
      isPrimaryOwner: slack.is_primary_owner,
      isRestricted: slack.is_restricted,
      isUltraRestricted: slack.is_ultra_restricted,
      isBot: slack.is_bot,
      isAppUser: slack.is_app_user,
      updated: slack.updated,
    }
  }

  static find(brain, id) {
    const users = brain.get('users');
    if (users && users[id]) return new User(users[id]);
    return new User(brain.userForId(id));
  }

  static all(brain) {
    const users = brain.get('users');
    return Object.values(users).map(user => new User(user))
  }

  static allWithEmpty(brain) {
    const userIds = Object.keys(brain.data.users);
    return userIds.map(userId => User.find(brain, userId));
  }

  static allGhNames(brain) {
    return User.all().map(user => user.github.name);
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
    if (this.ghName) return `
      ID: ${this.slackId}
      GitHub: @${this.github.name}
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
    users[this.slackId] = this;
    brain.set('users', users);
  }
}
