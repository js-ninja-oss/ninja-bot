// helper loads all scripts passed a directory
const ghHelper = require('../helpers/ghHelper');
const assert = require('chai').assert;

describe('test ghHelpers', function () {
  context('ghHelper.getPrs', function () {
    it('should return array', function () {
      const prs = ghHelper.getPrs('denoland/deno');
      assert.isArray(prs);
    });
  });
});
