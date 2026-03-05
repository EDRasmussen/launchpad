import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/components/login-form/login-form";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session.data) {
      throw redirect({ to: "/" });
    }
  },
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-md">
        <LoginForm />
      </div>
    </div>
  );
}
