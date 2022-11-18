import { QueryRenderer } from "react-relay";
import RelayEnvironment from "./environment";

export default function Query({ query, variables, render }) {
  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={query}
      variables={variables}
      render={render}
    />
  );
}
