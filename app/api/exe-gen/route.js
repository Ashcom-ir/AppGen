import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const light = searchParams.get("light");
  const dark  = searchParams.get("dark");

  if (!light || !dark) return new Response("Missing colors", { status: 400 });

  const backendPath = path.join(process.cwd(), "app", "backend");
  const buildScript = path.join(backendPath, "generate.py");

  return new Promise((resolve) => {
    exec(`python "${buildScript}" "${light}" "${dark}"`, { cwd: backendPath }, (err, stdout, stderr) => {
      console.log("stdout:", stdout);
      console.error("stderr:", stderr);

      if (err) return resolve(new Response("Build failed", { status: 500 }));

      // آخرین خط stdout مسیر exe است
      const lines = stdout.trim().split(/\r?\n/);
      const exePath = lines[lines.length - 1];

      if (!fs.existsSync(exePath)) return resolve(new Response("File not found", { status: 404 }));

      const fileStream = fs.createReadStream(exePath);
      const headers = new Headers();
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Disposition", "attachment; filename=export.exe");

      resolve(new Response(fileStream, { headers }));
    });
  });
}
