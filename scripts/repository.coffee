module.exports = (robot) ->
  robot.hear /repo add (.*)/i, (res) ->
    url = res.match[1]
    repos = robot.brain.get 'repos'
    repos = [] unless repos
    repos = repos.concat(url)
    robot.brain.set 'repos', repos
    res.send 'I added ' + url + ' to repos list.'

  robot.hear /repo list/i, (res) ->
    repos = robot.brain.get 'repos'
    reply = ''
    if repos
      reply = repos.join('\n')
    else
      reply = 'add repositories by saying "repo add url"'
    res.send reply
