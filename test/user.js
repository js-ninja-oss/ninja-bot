const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;
const githubs = [
  'ggtmtmgg',
  'yushimatenjin',
]

describe('test user.js', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user asks "user all"', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', `user github ${githubs[0]}`);
        yield this.room.user.say('user1', 'user me');
        yield this.room.user.say('user2', `user github ${githubs[1]}`);
        yield this.room.user.say('user2', 'user all');
      }.bind(this));
    });

    it('should add github accounts', function() {
      expect(this.room.messages).to.eql([
        ['user1', `user github ${githubs[0]}`],
        ['hubot', `I set your github account as @${githubs[0]}.`],
        ['user1', 'user me'],
        ['hubot', `\n      ID: user1\n      GitHub: @${githubs[0]}\n      PR(All Time): -1\n      PR Count(This Month): -1\n      PR(This Month):\n      \n    `],
        ['user2', `user github ${githubs[1]}`],
        ['hubot', `I set your github account as @${githubs[1]}.`],
        ['user2', 'user all'],
        ['hubot', `\n      ID: user1\n      GitHub: @${githubs[0]}\n      PR(All Time): -1\n      PR Count(This Month): -1\n      PR(This Month):\n      \n    \n--------\n\n      ID: user2\n      GitHub: @${githubs[1]}\n      PR(All Time): -1\n      PR Count(This Month): -1\n      PR(This Month):\n      \n    `],
      ]);
    });
  });
});
