import graphql from "babel-plugin-relay/macro";

export const CreateUserMutation = graphql`
  mutation createUserMutation($payload: CreateUserDTO!) {
    createUser(payload: $payload) {
      _id
    }
  }
`;
