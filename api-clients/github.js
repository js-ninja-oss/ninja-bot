/* https://developer.github.com/v4/explorer/ */
const GraphQLClient = require('graphql-request').GraphQLClient;
const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_TOKEN;
const headers = {
  'Authorization': `Bearer ${token}`,
}

const userPrs = async (name) => {
  const variables = {};
  const query = `{
    user(login:"${name}") {
      pullRequests(orderBy: {direction: DESC, field: CREATED_AT}, first: 100) {
        edges {
          node {
            author { url }
            createdAt
            repository { nameWithOwner }
            state
            title
            url
          }
        }
      }
    }
  }`

  const client = new GraphQLClient(endpoint, { headers: headers });
  const data = await client.request(query, variables);
  return data.user.pullRequests.edges;
}

const repoPrs = async (nameWithOwner) => {
  const variables = {};
  const owner = nameWithOwner.split('/')[0];
  const name = nameWithOwner.split('/')[1];
  const query = `{
    repository(owner:"${owner}", name:"${name}") {
      pullRequests(orderBy: {direction: DESC, field: CREATED_AT}, first: 100) {
        edges {
          node {
            author { url }
            createdAt
            repository { nameWithOwner }
            state
            title
            url
          }
        }
      }
    }
  }`

  const client = new GraphQLClient(endpoint, { headers: headers })
  const data = await client.request(query, variables)
  return data.repository.pullRequests.edges
}

module.exports = {
  repoPrs,
  userPrs,
};
