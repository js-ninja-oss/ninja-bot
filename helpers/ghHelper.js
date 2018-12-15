var GitHub = require('github-api');
// var github = new GitHub();
// var repo = github.getRepo('denoland', 'deno');
const getPrs = (repoName) => {
  return [{ url: 'str', user: 'str', state: 'str', repo: { full_name: repoName } }];

}

module.exports = {
  getPrs: getPrs
}
