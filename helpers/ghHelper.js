var GitHub = require('github-api');
// var github = new GitHub();
// var repo = github.getRepo('denoland', 'deno');
const getPrs = () => {
  return [{ url: 'str', user: 'str', state: 'str', repo: 'str' }];

}

module.exports = {
  getPrs: getPrs
}
