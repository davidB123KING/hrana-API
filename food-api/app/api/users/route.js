import { readData, writeData } from "@/lib/db";

export async function GET() {
  const data = readData();
  return Response.json(data.users.map(({ password, ...user }) => user));
}

export async function POST(req) {
  const body = await req.json();
  const data = readData();

  if (!body.name || !body.email || !body.password) {
    return Response.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  const existingUser = data.users.find(u => u.email === body.email);
  if (existingUser) {
    return Response.json({ error: "Email already registered" }, { status: 409 });
  }

  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
    password: body.password
  };

  data.users.push(newUser);
  writeData(data);

  const { password, ...userWithoutPassword } = newUser;
  return Response.json(userWithoutPassword, { status: 201 });
}
