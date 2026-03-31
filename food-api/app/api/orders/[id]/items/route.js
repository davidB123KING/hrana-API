import { readData, writeData } from "@/lib/db";

export async function POST(req, { params }) {
  const { id } = params;
  const { food_id, quantity } = await req.json();

  const data = readData();

  // preveri order
  const order = data.orders.find(o => o.id == id);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  // preveri food
  const food = data.foods.find(f => f.id === food_id);
  if (!food) {
    return Response.json({ error: "Food not found" }, { status: 404 });
  }

  const newItem = {
    id: Date.now(),
    order_id: parseInt(id),
    food_id,
    quantity
  };

  data.orderItems.push(newItem);
  writeData(data);

  return Response.json(newItem, { status: 201 });
}