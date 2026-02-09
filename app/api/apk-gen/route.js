import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const root = process.cwd();
    const mobileDir = path.join(root, "appgen-mobile");
    const buildDir = path.join(mobileDir, ".build");

    if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

    const output = execSync(
      "npx eas build -p android --profile preview --json --non-interactive",
      {
        cwd: mobileDir,
        encoding: "utf-8",
        stdio: "pipe",
      }
    );

    console.log("EAS OUTPUT:", output);

    const result = JSON.parse(output);
    const buildId = result.id;

    fs.writeFileSync(
      path.join(buildDir, "build.json"),
      JSON.stringify({ buildId }, null, 2)
    );

    return Response.json({
      status: "started",
      buildId,
    });
  } catch (err) {
    console.error("APK-GEN ERROR:", err);

    return new Response(
      JSON.stringify({
        error: "APK build failed",
        message: err.message,
      }),
      { status: 500 }
    );
  }
}
