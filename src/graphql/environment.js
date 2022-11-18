import { Environment, Network, RecordSource, Store } from "relay-runtime";

// Server to be used as backend.
const PROD_ENDPOINT = "https://gql.repplic.com/";
const DEV_ENDPOINT = "http://localhost:4000/";

// Obtain the endpoint to use depending on whether the app runs in production or dev mode.
function getEndpoint() {
  return process.env["NODE_ENV"] === "production"
    ? PROD_ENDPOINT
    : DEV_ENDPOINT;
}

// Obtain the access token to make requests that require authentication.
function getAuthorization() {
  const token = localStorage.getItem("token");
  return "bearer " + (token || "none");
}

// Send a GraphQL request to the endpoint server.
async function gqlFetch(text, variables) {
  // Fetch data from GraphQL endpoint.
  const response = await fetch(getEndpoint(), {
    method: "POST",
    headers: {
      Authorization: getAuthorization(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params, variables) {
  console.log(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`
  );
  return gqlFetch(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
