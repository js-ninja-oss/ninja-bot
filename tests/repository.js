const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;
const repos = [
  'https://github.com/facebook/react-native',
  'https://github.com/denoland/deno',
];
const rnRepo = 'https://github.com/facebook/react-native';

describe('test repository.coffee', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user asks repositories to hubot', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user1', 'repo add https://repo.com/1');
        yield this.room.user.say('user1', 'repo list');
        yield this.room.user.say('user2', 'repo add https://repo.com/2');
        yield this.room.user.say('user2', 'repo list');
      }.bind(this));
    });

    it('should add repositories', function() {
      expect(this.room.messages).to.eql([
        ['user1', 'repo list'],
        ['hubot', 'add repositories by saying "repo add url"'],
        ['user1', 'repo add https://repo.com/1'],
        ['hubot', 'I added https://repo.com/1 to repos list.'],
        ['user1', 'repo list'],
        ['hubot', 'https://repo.com/1'],
        ['user2', 'repo add https://repo.com/2'],
        ['hubot', 'I added https://repo.com/2 to repos list.'],
        ['user2', 'repo list'],
        ['hubot', 'https://repo.com/1\nhttps://repo.com/2'],
      ]);
    });
  });
});
