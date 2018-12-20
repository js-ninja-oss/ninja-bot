module.exports = robot => {
  return robot.hear(/ninja/i, res => {
    return res.send('ninja!');
  });
};
