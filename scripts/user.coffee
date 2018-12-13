module.exports = (robot) ->
  robot.hear /github (\w*)/i, (res) ->
    github = res.match[1]
    userId = res.message.user.id

    users = robot.brain.get 'users'
    users = {} unless users
    users[userId] = { github: github }
    robot.brain.set 'users', users
    console.log users
    res.send 'I set your github account as @' + github + '.'

  robot.hear /info/i, (res) ->
    userId = res.message.user.id
    users = robot.brain.get 'users'
    reply = ''
    if users && users[userId]
      reply = 'I your github account is @' + users[userId]['github'] + '.'
    else
      reply = 'tell me your account by saying "github AccountName"'
    res.send reply
