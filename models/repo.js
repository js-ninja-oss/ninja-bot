module.exports = class Repo {
  constructor(orgTitle) {
    this.url = `https://github.com/${orgTitle}`
    this.org = orgTitle.split('/')[0];
    this.title = orgTitle.split('/')[1];
  }

  static all(brain){
    const repos = brain.get('repos');
    /* TODO: モデル化して返す
    return repos.map(repo => new Repo(repo));
    */
    return repos;
  }

  static add(brain, orgTitle) {
    // TODO: フォーマットどおりかバリデーション
    // TODO: 存在するかバリデーション
    // TODO: 重複しないようにバリデーション
    let repos = brain.get('repos');
    if (!repos) repos = [];
    repos = repos.concat(orgTitle);
    brain.set('repos', repos);
    return true;
  }
}
