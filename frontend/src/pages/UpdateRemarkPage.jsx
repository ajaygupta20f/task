import { useState } from "react";
import { apiPut } from "../lib/api";

export default function UpdateRemarkPage() {
  const [configId, setConfigId] = useState("");
  const [remark, setRemark] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");

    if (!configId.trim()) {
      setError("Please enter a configId");
      return;
    }
    if (!remark.trim()) {
      setError("Please enter a remark");
      return;
    }

    try {
      setLoading(true);
      const data = await apiPut(
        `/api/configurations/${encodeURIComponent(configId.trim())}`,
        { remark: remark.trim() }
      );
      setResult(JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-slate-200">
        <h1 className="text-2xl font-semibold mb-4">Update Remark</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            className="border border-slate-300 rounded-xl px-4 py-2  "
            placeholder="Enter configId to update"
            value={configId}
            onChange={(e) => setConfigId(e.target.value)}
          />
          <textarea
            className="min-h-[120px] border border-slate-300 rounded-xl px-4 py-2 "
            placeholder="Enter remark text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Updating…" : "Update"}
          </button>
        </form>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 border border-red-200">{error}</div>
        )}
        {result && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">{result}</div>
        )}
      </div>
    </section>
  );
}
