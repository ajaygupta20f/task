import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const linkBase = "px-4 py-2 rounded-xl";
  const active = "bg-slate-900 text-white";
  const inactive = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50";

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-lg">Configurations App</div>
        <div className="flex gap-2">
          <Link className={`${linkBase} ${pathname === "/" ? active : inactive}`} to="/">
            Fetch
          </Link>
          <Link className={`${linkBase} ${pathname === "/update" ? active : inactive}`} to="/update">
            Update Remark
          </Link>
        </div>
      </nav>
    </header>
  );
}
