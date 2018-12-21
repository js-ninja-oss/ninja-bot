module.exports = class User {
  constructor(obj) {
    this.github = obj.github;
    this.slackId = obj.slackId;
    this.prCount = obj.prCount;
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
        github: 'ggtmtmgg',
        slackId: 'slackId1',
        prCount: 0,
      }),
      new User({
        github: 'watanabeyu',
        slackId: 'slackId2',
        prCount: 0,
      }),
    ];
  }
 
  static allGithubs(brain) {
    return User.all().map(user => user.github);
  }

  static updateGithub(brain, slackId, github) {
    let users = brain.get('users');
    if (!users) {
      users = {};
    }
    users[slackId] = {
      github: github,
    };
    brain.set('users', users); // TODO: モデル側でsaveをする
    return true;
  }
}
