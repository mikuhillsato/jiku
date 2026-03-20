import { type NextRequest, NextResponse } from "next/server";
import { pbkdf2Sync } from "crypto";
import { get } from "@vercel/blob";

interface ReportMeta {
  token: string;
  name: string;
  password_hash: string;
  salt: string;
  html_url: string;
}

async function fetchMeta(token: string): Promise<ReportMeta | null> {
  const result = await get(`reports/report_${token}.meta.json`, { access: "private" });
  if (!result) return null;
  const text = await result.blob.text();
  return JSON.parse(text) as ReportMeta;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { password } = (await req.json()) as { password: string };

  if (!password || !token) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const meta = await fetchMeta(token);
  if (!meta) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const hash = pbkdf2Sync(password, meta.salt, 100_000, 32, "sha256").toString("hex");
  if (hash !== meta.password_hash) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  const htmlResult = await get(`reports/report_${token}.html`, { access: "private" });
  if (!htmlResult) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const html = await htmlResult.blob.text();

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
