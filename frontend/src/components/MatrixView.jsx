export default function MatrixView({ matrix }) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return <p className="text-slate-500">No data.</p>;
  }

  const cols = Array.isArray(matrix[0]) ? matrix[0].length : 0;

  return (
    <div className="overflow-x-auto">
      <div
        className="grid border border-slate-300"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {matrix.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="border border-slate-300 p-3 text-center font-medium bg-white text-black"
            >
              
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
