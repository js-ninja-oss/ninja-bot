const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co     = require('co');
const expect = require('chai').expect;

describe('test general.coffee', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user says ninja to hubot', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('user1', 'ninja');
        yield this.room.user.say('user2', 'ninja');
      }.bind(this));
    });

    it('should reply to user', function() {
      expect(this.room.messages).to.eql([
        ['user1', 'ninja'],
        ['hubot', 'ninja!'],
        ['user2', 'ninja'],
        ['hubot', 'ninja!']
      ]);
    });
  });
});
