import type { Metadata } from "next";
import ReportGate from "./ReportGate";

export const metadata: Metadata = {
  title: "鑑定レポート",
  robots: { index: false, follow: false },
};

export default async function ReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ReportGate token={token} />;
}
