import { readData } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const data = readData();

  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = data.users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(userWithoutPassword);

  return Response.json({ token });
}
