import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '88a5501e215762d0f76c9fd0dc7a965fbf9051f0', queries,  });
export default client;
  