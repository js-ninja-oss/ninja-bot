module.exports = class Repo {
  constructor(nameWithOwner) {
    this.url = `https://github.com/${nameWithOwner}`
    this.owner = nameWithOwner.split('/')[0];
    this.name = nameWithOwner.split('/')[1];
  }

  static all(brain){
    const repos = brain.get('repos') || [];
    return repos.map(repo => new Repo(repo));
  }

  static allUrls(brain){
    return Repo.all(brain).map(repo => repo.url);
  }

  static add(brain, nameWithOwner) {
    // TODO: フォーマットどおりかバリデーション
    // TODO: 存在するかバリデーション
    // TODO: 重複しないようにバリデーション
    let repos = brain.get('repos');
    if (!repos) repos = [];
    repos = repos.concat(nameWithOwner);
    brain.set('repos', repos);
    return true;
  }
}
