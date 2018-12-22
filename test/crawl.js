const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;
const githubs = [
  'ggtmtmgg',
  'yushimatenjin',
]

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
        yield this.room.user.say('user2', `user github ${githubs[1]}`);
        yield this.room.user.say('user2', 'crawl all');
      }.bind(this));
    });

    it('should add github accounts', function() {
      this.timeout(15000);
      return co(function*() {
        yield sleep(5000);
        yield this.room.user.say('user1', `user all`);
      }.bind(this));

      expect(this.room.messages.slice(this.room.messages.length - 2)).to.eql([
        ['user1', 'user all'],
        ['hubot', `\n      ID: user1\n      GitHub: @${githubs[0]}\n      PR(All Time): -1\n      PR Count(This Month): -1\n      PR(This Month):\n      \n    \n--------\n\n      ID: user2\n      GitHub: @${githubs[1]}\n      PR(All Time): -1\n      PR Count(This Month): -1\n      PR(This Month):\n      \n    `],
      ]);
    });
  });
});
