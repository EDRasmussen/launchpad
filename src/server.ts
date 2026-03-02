import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { ensureAdminExists } from "./lib/seed";

await ensureAdminExists();

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request);
  },
});
