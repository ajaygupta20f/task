import { useState } from "react";
import { apiGet } from "../lib/api";
import MatrixView from "../components/MatrixView";

export default function FetchConfigPage() {
  const [configId, setConfigId] = useState("");
  const [matrix, setMatrix] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMatrix(null);
    if (!configId.trim()) {
      setError("Please enter a configId");
      return;
    }
    try {
      setLoading(true);
     const data = await apiGet(`/api/configurations/${encodeURIComponent(configId.trim())}`);
    
setMatrix(data.matrix || data);  

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-slate-200">
        <h1 className="text-2xl font-semibold mb-4">Fetch Configuration</h1>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Enter configId (e.g. qwertyuiop)"
            value={configId}
            onChange={(e) => setConfigId(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading…" : "Get Data"}
          </button>
        </form>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 border border-red-200">{error}</div>
        )}

        <div className="min-h-[100px]">
          {matrix && <MatrixView matrix={matrix} />}
        </div>
      </div>
    </section>
  );
}
