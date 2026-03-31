import { readData, writeData } from "@/lib/db";

export async function GET() {
  const data = readData();
  return Response.json(data.foods);
}

export async function POST(req) {
  const body = await req.json();
  const data = readData();

  const newFood = {
    id: Date.now(),
    name: body.name,
    price: body.price
  };

  data.foods.push(newFood);
  writeData(data);

  return Response.json(newFood, { status: 201 });
}