const Pr = require('../models/pr');
const GitHub = require('github-api');

module.exports = async brain => {
  const prs = Pr.filterThisMonth(await Pr.all(brain));

  console.log(prs);
}

