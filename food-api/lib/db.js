import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "data.json");

export function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}