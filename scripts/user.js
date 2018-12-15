module.exports = function (robot) {
  robot.hear(/user github (\w*)/i, function (res) {
    var github, userId, users;
    github = res.match[1];
    userId = res.message.user.id;
    users = robot.brain.get('users');
    if (!users) {
      users = {};
    }
    users[userId] = {
      github: github
    };
    robot.brain.set('users', users);
    console.log(users);
    return res.send('I set your github account as @' + github + '.');
  });
  return robot.hear(/user info/i, function (res) {
    var reply, userId, users;
    userId = res.message.user.id;
    users = robot.brain.get('users');
    reply = '';
    if (users && users[userId]) {
      reply = 'I your github account is @' + users[userId]['github'] + '.';
    } else {
      reply = 'tell me your account by saying "user github AccountName"';
    }
    return res.send(reply);
  });
};