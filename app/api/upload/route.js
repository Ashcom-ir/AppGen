import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) return Response.json({ error:"No File" },{status:400});

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(),"public/uploads");
  const filePath = path.join(uploadDir, file.name);

  await writeFile(filePath, buffer);

  return Response.json({status:"ok",file:`/uploads/${file.name}`});
}
