import { readData, writeData } from "@/lib/db";

// GET → vrne vse orderje
export async function GET() {
  const data = readData();
  return Response.json(data.orders);
}

// POST → ustvari nov order
export async function POST(req) {
  const { user_id } = await req.json();
  const data = readData();

  const userExists = data.users.find(u => u.id === user_id);
  if (!userExists) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const newOrder = {
    id: Date.now(),
    user_id,
    status: "pending",
    created_at: new Date()
  };

  data.orders.push(newOrder);
  writeData(data);

  return Response.json(newOrder, { status: 201 });
}