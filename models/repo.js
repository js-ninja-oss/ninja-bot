module.exports = class Repo {
  constructor(nameWithOwner) {
    this.url = `https://github.com/${nameWithOwner}`
    this.org = nameWithOwner.split('/')[0];
    this.title = nameWithOwner.split('/')[1];
  }

  static all(brain){
    // TODO: ちゃんと返す
    // const repos = brain.get('repos');
    
    return [
      new Repo('denoland/deno'),
      new Repo('facebook/react-native'),
    ];
  }

  static allUrls(brain){
    return Repo.all().map(repo => repo.url);
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
