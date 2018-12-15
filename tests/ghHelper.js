// helper loads all scripts passed a directory
const ghHelper = require('../helpers/ghHelper');
const assert = require('chai').assert;

describe('test ghHelpers', function () {
  context('ghHelper.getPrs', function () {
    it('should return array', function () {
      const prs = ghHelper.getPrs('denoland/deno');
      assert.isArray(prs);
    });

    it('should return pull request object', function () {
      const prs = ghHelper.getPrs('denoland/deno');
      assert.hasAllKeys(prs[0], ['url', 'user', 'state', 'repo']);
    });

    it('should return exact repo full name', function () {
      const repoName = 'denoland/deno';
      const prs = ghHelper.getPrs(repoName);
      assert(prs[0].repo.full_name === repoName);
    });
  });
});
