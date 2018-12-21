const Pr = require('./pr');

module.exports = class User {
  constructor(obj) {
    this.ghName = obj.ghName;
    this.slackId = obj.slackId;
    this.ghPrCount = obj.ghPrCount || -1;
  }

  static find(brain, slackId) {
    const users = brain.get('users');
    let user;
    if (users && users[slackId]) {
      user = users[slackId];
    } else {
      user = { slackId: slackId };
    }
    return new User(user);
  }

  static all(brain) {
    // TODO: ちゃんと返す
    // const users = brain.get('users');
    return [
      new User({
        ghName: 'ggtmtmgg',
        slackId: 'slackId1',
      }),
      new User({
        ghName: 'watanabeyu',
        slackId: 'slackId2',
      }),
    ];
  }

  static allGhNames(brain) {
    return User.all().map(user => user.ghName);
  }

  static updateGhName(brain, slackId, ghName) {
    let users = brain.get('users');
    if (!users) {
      users = {};
    }
    users[slackId] = {
      ghName: ghName,
      slackId: slackId,
    };
    brain.set('users', users); // TODO: モデル側でsaveをする
    return true;
  }

  async ghPrs(){
    const Pr = require('./pr');
    this.prs = await Pr.byUser(this.ghName);
    return this.prs;
  }

  async updatePrs(brain, res){
    const Pr = require('./pr');
    let users = brain.get('users');
    let prs = await this.ghPrs();
    users[this.slackId].ghPrCount = prs.length;
    brain.set('users', users);
    res.send(`updated ${this.ghName}'s pr count as ${prs.length}`);
  }

  info() {
    if (this.ghName) return `
      ID: ${this.slackId}
      GitHub: @${this.ghName}
      PR(This Month): ${this.ghPrCount}
    `;
    return 'Set github name by "user github AccountName"';
  }
}
