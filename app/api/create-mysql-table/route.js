import { db } from "@/lib/db";
import { buildCreateTableSQL } from "@/lib/schema/create-table.builder";
import { NextResponse } from "next/server";
import { saveSchema } from "@/lib/schema/schema.repository";
export async function POST(req) {
  try {
    const payload = await req.json();

    const sql = buildCreateTableSQL(payload);

    await db.execute(sql);
    await saveSchema(payload);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}


