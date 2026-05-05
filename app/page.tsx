import { client } from "../tina/__generated__/client";

import HomeClient from "./home-client";

export default async function HomePage() {
  let result;
  try {
    result = await client.queries.eventConnection();
  } catch (error) {
    console.error("TinaCMS fetch error:", error);
    result = { data: { eventConnection: { edges: [] } }, query: "", variables: {} };
  }

  return (
    <HomeClient
      eventsData={result.data}
      eventsQuery={result.query}
      eventsVariables={result.variables}
    />
  );
}