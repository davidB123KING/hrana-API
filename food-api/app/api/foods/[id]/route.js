import { readData, writeData } from "@/lib/db";

export async function GET(req, { params }) {
  const data = readData();
  const id = Number(params.id);
  const food = data.foods.find(item => item.id === id);

  if (!food) {
    return Response.json({ error: "Food not found" }, { status: 404 });
  }

  return Response.json(food);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const data = readData();
  const id = Number(params.id);
  const foodIndex = data.foods.findIndex(item => item.id === id);

  if (foodIndex === -1) {
    return Response.json({ error: "Food not found" }, { status: 404 });
  }

  if (!body.name && typeof body.price !== "number") {
    return Response.json({ error: "Name or numeric price is required" }, { status: 400 });
  }

  const updatedFood = {
    ...data.foods[foodIndex],
    name: body.name ?? data.foods[foodIndex].name,
    price: typeof body.price === "number" ? body.price : data.foods[foodIndex].price
  };

  data.foods[foodIndex] = updatedFood;
  writeData(data);

  return Response.json(updatedFood);
}

export async function DELETE(req, { params }) {
  const data = readData();
  const id = Number(params.id);
  const foodIndex = data.foods.findIndex(item => item.id === id);

  if (foodIndex === -1) {
    return Response.json({ error: "Food not found" }, { status: 404 });
  }

  const deletedFood = data.foods.splice(foodIndex, 1)[0];
  writeData(data);

  return Response.json(deletedFood);
}
