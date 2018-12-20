const repoCrawler = require('../crawlers/repo');

module.exports = robot => {
  robot.hear(/crawl start/i, res => {
    repoCrawler(robot.brain);
  });
};
