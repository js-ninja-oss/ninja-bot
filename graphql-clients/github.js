const graphqlRequest = require('graphql-request');
const request = graphqlRequest.request;
const GraphQLClient = graphqlRequest.GraphQLClient;
const endpoint = 'https://api.github.com/graphql';
const config = require('config');
const token = config.get('github.token');
const headers = {
  'Authorization': `Bearer ${token}`,
}
const variables = {}

const query = `{
  viewer {
    login
    starredRepositories(last: 5) {
      nodes {
        name
      }
    }
  }
}`

const client = new GraphQLClient(endpoint, { headers: headers })
client.request(query, variables).then(data => console.log(data))
