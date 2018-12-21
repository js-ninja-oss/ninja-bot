/* https://developer.github.com/v4/explorer/ */
const GraphQLClient = require('graphql-request').GraphQLClient;
const endpoint = 'https://api.github.com/graphql';
const config = require('config');
const token = config.get('github.token');
const headers = {
  'Authorization': `Bearer ${token}`,
}


const getPrs = async (nameWithOwner) => {
  const variables = {};
  const owner = nameWithOwner.split('/')[0];
  const name = nameWithOwner.split('/')[1];
  const query = `{
    repository(owner:"${owner}", name:"${name}") {
      pullRequests(last:20) {
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
  getPrs,
};
