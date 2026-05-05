import { client } from "../tina/__generated__/client";
import HomeClient from "./home-client";

export default async function HomePage() {
  const result = await client.queries.eventConnection();

  return (
    <HomeClient
      eventsData={result.data}
      eventsQuery={result.query}
      eventsVariables={result.variables}
    />
  );
}