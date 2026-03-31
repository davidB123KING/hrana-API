import { readData } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  const { email } = await req.json();
  const data = readData();

  const user = data.users.find(u => u.email === email);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const token = generateToken(user);

  return Response.json({ token });
}