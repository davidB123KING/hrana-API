import { readData, writeData } from "@/lib/db";

// GET → vrne vse uporabnike
export async function GET() {
  const data = readData();
  return Response.json(data.users);
}

// POST → ustvari novega uporabnika
export async function POST(req) {
  const body = await req.json();
  const data = readData();

  // ustvarimo userja
  const newUser = {
    id: Date.now(),     // enostaven ID
    name: body.name,
    email: body.email
  };

  data.users.push(newUser);
  writeData(data);

  return Response.json(newUser, { status: 201 });
}