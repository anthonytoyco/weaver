import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import songGenerator from "./songGenerator";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("video");

    const UPLOAD_DIR = path.join(process.cwd(), "app", "UPLOADS");

    const fileExt = path.extname(file.name).toLowerCase();
    const baseName = path
      .basename(file.name, fileExt)
      .replace(/[^\w-]/g, "") // Remove special chars
      .substring(0, 50); // Limit length
    const filename = `${Date.now()}-${baseName}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, Buffer.from(buffer));

    return NextResponse.json(songGenerator(filePath))

  } catch (err) {
    // Replace this 
    console.log("Draft");
  }
  return NextResponse.json({ test: "Test" });
}
