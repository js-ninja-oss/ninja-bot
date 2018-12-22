const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const expect = require('chai').expect;
const co = require('co');

describe('test general.js', function () {
  beforeEach(function () {
    this.room = helper.createRoom();
  });
  afterEach(function () {
    this.room.destroy();
  });

  describe('user asks "ninja"', function () {
    beforeEach(function () {
      return co(function* () {
        yield this.room.user.say('user1', 'ninja');
        yield this.room.user.say('user2', 'ninja');
      }.bind(this));
    });

    it('should replay "ninja!"', function () {
      expect(this.room.messages).to.eql([
        ['user1', 'ninja'],
        ['hubot', 'ninja!'],
        ['user2', 'ninja'],
        ['hubot', 'ninja!']
      ]);
    });
  });
});
