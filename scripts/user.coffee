module.exports = (robot) ->
  robot.hear /github (\w*)/i, (res) ->
    # TODO: save user account
    console.log res
    github = res.match[1]
    userId = res.message.user.id
    res.send "Your user id is " + userId + "."
    res.send "I'm going to set your github account as @" + github + "."

    count = robot.brain.get 'count'
    count = 0 unless count
    count += 1
    robot.brain.set 'count', count
    res.send "" + count
