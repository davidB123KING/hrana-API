import { readData, writeData } from "@/lib/db";

function sanitizeUser(user) {
  const { password, ...sanitized } = user;
  return sanitized;
}

export async function GET(req, { params }) {
  const data = readData();
  const { id: paramId } = await params;
  const id = Number(paramId);
  const user = data.users.find(item => item.id === id);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(sanitizeUser(user));
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const data = readData();
  const { id: paramId } = await params;
  const id = Number(paramId);
  const userIndex = data.users.findIndex(item => item.id === id);

  if (userIndex === -1) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (!body.name && !body.email && !body.password) {
    return Response.json({ error: "Name, email or password is required" }, { status: 400 });
  }

  if (body.email) {
    const existingUser = data.users.find(u => u.email === body.email && u.id !== id);
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 409 });
    }
  }

  const currentUser = data.users[userIndex];
  const updatedUser = {
    ...currentUser,
    name: body.name ?? currentUser.name,
    email: body.email ?? currentUser.email,
    password: body.password ?? currentUser.password
  };

  data.users[userIndex] = updatedUser;
  writeData(data);

  return Response.json(sanitizeUser(updatedUser));
}

export async function DELETE(req, { params }) {
  const data = readData();
  const { id: paramId } = await params;
  const id = Number(paramId);
  const userIndex = data.users.findIndex(item => item.id === id);

  if (userIndex === -1) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const deletedUser = data.users.splice(userIndex, 1)[0];
  writeData(data);

  return Response.json(sanitizeUser(deletedUser));
}
