import { createCoreTables } from "@/lib/install/create-core-tables";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await createCoreTables();
    return NextResponse.json({ installed: true });
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
