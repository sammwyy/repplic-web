import Query from "./graphql/query";
import { FindProfileQuery } from "./graphql/queries";

function App() {
  return (
    <div>
      <Query
        query={FindProfileQuery}
        variables={{ username: "sammwy" }}
        render={({ error, props }) => {
          return <div> {props && JSON.stringify(props)} </div>;
        }}
      />
    </div>
  );
}

export default App;
