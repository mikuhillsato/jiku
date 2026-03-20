"use client";

import { useState } from "react";

export default function ReportGate({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/report/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setHtml(await res.text());
    } else if (res.status === 401) {
      setError("パスワードが正しくありません");
    } else if (res.status === 404) {
      setError("レポートが見つかりません");
    } else {
      setError("エラーが発生しました。しばらくしてから再度お試しください。");
    }
    setLoading(false);
  }

  if (html) {
    return (
      <iframe
        srcDoc={html}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          zIndex: 9999,
        }}
        sandbox="allow-scripts allow-same-origin"
        title="鑑定レポート"
      />
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div
        className="border border-[#DDDAD2] bg-[#F9F9F7] p-10 w-full mx-4"
        style={{ maxWidth: 380 }}
      >
        <p
          style={{ fontSize: "9px", letterSpacing: "0.4em" }}
          className="uppercase text-[#AAAAAA] mb-6"
        >
          Private Report — MyJiku
        </p>

        <h1
          className="font-display font-light mb-2"
          style={{ fontSize: "clamp(22px,3vw,28px)" }}
        >
          鑑定レポート
        </h1>

        <p className="text-xs text-[#777777] leading-loose mb-8">
          このレポートは鍵付きコンテンツです。
          <br />
          お送りしたパスワードを入力してください。
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            autoComplete="current-password"
            className="w-full border border-[#DDDAD2] bg-white px-4 py-3 text-sm outline-none focus:border-[#111111] transition-colors mb-3"
          />

          {error && (
            <p className="text-xs text-red-500 mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#111111] text-white py-3 text-xs tracking-widest hover:bg-[#333333] transition-colors disabled:opacity-40"
          >
            {loading ? "確認中…" : "レポートを開く"}
          </button>
        </form>
      </div>
    </div>
  );
}
