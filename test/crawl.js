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

  context('crawl github account', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', `user github ${githubs[0]}`);
        yield this.room.user.say('user2', `user github ${githubs[1]}`);
        yield this.room.user.say('user2', 'crawl all');
      }.bind(this));
    });

    it('should update user infomations', async function() {
      this.timeout(15000);
      await co(function*() {
        yield sleep(1000);
        yield this.room.user.say('user1', `user all`);
      }.bind(this));

      const lastMessage = this.room.messages[this.room.messages.length - 1];
      // NOTE: クロールに失敗して初期値のままだと"-1"を含んでいる
      expect(lastMessage).not.to.match(/-1/);
    });
  });
});
