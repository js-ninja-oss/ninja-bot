const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co = require('co');
const repos = [
  'https://github.com/facebook/react-native',
  'https://github.com/denoland/deno',
];

describe('test repository.js', function () {
  beforeEach(function () {
    this.room = helper.createRoom();
  });
  afterEach(function () {
    this.room.destroy();
  });

  describe('user asks repositories to hubot', function () {
    beforeEach(function () {
      return co(function* () {
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user1', `repo add ${repos[0]}`);
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user2', `repo add ${repos[1]}`);
        yield this.room.user.say('user2', 'repo list');
      }.bind(this));
    });

    it('should add repositories', function () {
      expect(this.room.messages).to.eql([
        ['user1', 'repo list'],
        ['hubot', 'add repositories by saying "repo add url"'],
        ['user1', `repo add ${repos[0]}`],
        ['hubot', `I added ${repos[0]} to repos list.`],
        ['user1', 'repo list'],
        ['hubot', repos[0]],
        ['user2', `repo add ${repos[1]}`],
        ['hubot', `I added ${repos[1]} to repos list.`],
        ['user2', 'repo list'],
        ['hubot', repos.join('\n')],
      ]);
    });
  });
});
