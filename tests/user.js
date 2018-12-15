const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;
const githubs = [
  'ggtmtmgg',
  'yushimatenjin',
]

describe('test repository.coffee', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user asks adding github account', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', `user github ${githubs[0]}`);
        yield this.room.user.say('user1', 'user info');
        yield this.room.user.say('user2', `user github ${githubs[1]}`);
        yield this.room.user.say('user2', 'user info');
      }.bind(this));
    });

    it('should add github accounts', function() {
      expect(this.room.messages).to.eql([
        ['user1', `user github ${githubs[0]}`],
        ['hubot', `I set your github account as @${githubs[0]}.`],
        ['user1', 'user info'],
        ['hubot', `I your github account is @${githubs[0]}.`],
        ['user2', `user github ${githubs[1]}`],
        ['hubot', `I set your github account as @${githubs[1]}.`],
        ['user2', 'user info'],
        ['hubot', `I your github account is @${githubs[1]}.`],
      ]);
    });
  });
});
