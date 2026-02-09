import fs from "fs";
import path from "path";

export async function GET() {
  const buildFile = path.join(
    process.cwd(),
    "appgen-mobile/.build/build.json"
  );

  if (!fs.existsSync(buildFile)) {
    return Response.json({ status: "no-build" });
  }

  const { buildId } = JSON.parse(fs.readFileSync(buildFile, "utf8"));

  const res = await fetch(
    `https://api.expo.dev/v2/builds/${buildId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_TOKEN}`,
      },
    }
  );

  const json = await res.json();
  const data = json.data;

  if (data.status === "FINISHED") {
    return Response.json({
      done: true,
      url: data.artifacts?.buildUrl,
    });
  }

  return Response.json({
    status: data.status,
  });
}
