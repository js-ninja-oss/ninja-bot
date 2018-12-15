module.exports = function(robot) {
  return robot.hear(/ninja/i, function(res) {
    return res.send('ninja!');
  });
};
