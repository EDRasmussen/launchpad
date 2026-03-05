import { createFileRoute } from "@tanstack/react-router";

import { auth } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        try {
          return await auth.handler(request);
        } catch (e) {
          return new Response(
            JSON.stringify({ error: "Authentication failed" }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      POST: async ({ request }: { request: Request }) => {
        try {
          return await auth.handler(request);
        } catch (e) {
          return new Response(
            JSON.stringify({ error: "Authentication failed" }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
