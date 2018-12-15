const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('../scripts');
const co = require('co');

const room = helper.createRoom();
beforeAll(done => {
  room.user.say('user1', 'ninja');
  room.user.say('user2', 'ninja');
  return done();
});
afterAll(() => {
  room.destroy();
});

describe('test general.js', function () {
  describe('user says ninja to hubot', function () {

    it('should reply to user', function () {
      expect(room.messages).toEqual([
        ['user1', 'ninja'],
        ['hubot', 'ninja!'],
        ['user2', 'ninja'],
        ['hubot', 'ninja!']
      ]);
    });
  });
});
