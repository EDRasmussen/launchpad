import { auth } from "../src/lib/auth";

async function seed() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const name = process.env.ADMIN_NAME!;

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
    console.log("Admin account created");
  } catch {
    console.log("Admin account already exists, skipping");
  }

  process.exit(0);
}

seed();
