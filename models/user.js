module.exports = class User {
  constructor(obj) {
    this.github = obj.github;
    this.slackId = obj.slackId;
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

  static list(brain){
    const users = brain.get('users');
    /* TODO: モデル化して返す
    return users.map(user => new User(user));
    */
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
