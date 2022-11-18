import graphql from "babel-plugin-relay/macro";

export const FindProfileQuery = graphql`
  query findProfileQuery($username: String!) {
    findProfile(username: $username) {
      _id
      username
      displayName
      bio
      createdAt
    }
  }
`;
