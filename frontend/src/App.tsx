import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";

export default function App() {
  const loc = useLocation();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b1020]/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="font-bold tracking-wide">Algorand TestNet TX</div>
          <nav className="space-x-4">
            <Link className={`hover:underline ${loc.pathname === "/" ? "underline" : ""}`} to="/">Home</Link>
            <Link className={`hover:underline ${loc.pathname === "/history" ? "underline" : ""}`} to="/history">History</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-white/60">
        Backend: <code>{import.meta.env.VITE_BACKEND_URL || "NOT SET"}</code>
      </footer>
    </div>
  );
}
