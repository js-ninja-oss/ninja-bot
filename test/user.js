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

  context('user asks "ninja user all --github"', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', `ninja github ${githubs[0]}`);
        yield this.room.user.say('user2', `ninja github ${githubs[1]}`);
        yield this.room.user.say('user2', 'ninja user all --github');
      }.bind(this));
    });

    it('should add github accounts', function() {
      const lastMessage = this.room.messages[this.room.messages.length - 1][1];
      // NOTE: クロールに失敗して初期値のままだと"-1"を含んでいる
      expect(lastMessage).to.include(githubs[0]);
      expect(lastMessage).to.include(githubs[1]);
    });
  });
});
