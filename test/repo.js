const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;
const repos = [
  'denoland/deno',
  'facebook/react-native',
];

const repoUrls = repos.map(repo => `https://github.com/${repo}`);

describe('test repo.js', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user asks "repo add repos"', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user1', `repo add ${repos[0]}`);
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user2', `repo add ${repos[1]}`);
        yield this.room.user.say('user2', 'repo list');
      }.bind(this));
    });

    it('should set repositories', function() {
      expect(this.room.messages).to.eql([
        ['user1', 'repo list'],
        ['hubot', 'add repositories by saying "repo add url"'],
        ['user1', `repo add ${repos[0]}`],
        ['hubot', `I added ${repos[0]} to repos list.`],
        ['user1', 'repo list'],
        ['hubot', repoUrls[0]],
        ['user2', `repo add ${repos[1]}`],
        ['hubot', `I added ${repos[1]} to repos list.`],
        ['user2', 'repo list'],
        ['hubot', repoUrls.join('\n')],
      ]);
    });
  });
});
