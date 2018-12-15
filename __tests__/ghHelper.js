// helper loads all scripts passed a directory
const ghHelper = require('../helpers/ghHelper');

describe('test ghHelpers', function () {
  describe('ghHelper.getPrs', function () {
    it('should return array', function () {
      const prs = ghHelper.getPrs('denoland/deno');
      expect(prs).toBeArray()
    });


    it('should return pull request object', function () {
      const prs = ghHelper.getPrs('denoland/deno');
      const expected = ['url', 'user', 'state', 'repo']
      expect(prs[0]).toContainKeys(expected);
    });

    it('should return exact repo full name', function () {
      const repoName = 'denoland/deno';
      const prs = ghHelper.getPrs(repoName);
      expect(prs[0].repo.full_name).toBe(repoName);
    });
  });
});
