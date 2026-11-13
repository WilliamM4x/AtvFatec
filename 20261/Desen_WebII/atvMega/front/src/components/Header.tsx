import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-center gap-10 p-5 bg-emerald-800 text-white shadow-xl mb-10">
      <Link to="/" className="font-bold hover:text-emerald-300 transition-colors uppercase">
        🔍 Home
      </Link>
      <Link to="/palpite" className="font-bold hover:text-emerald-300 transition-colors uppercase">
        🎲 Palpite
      </Link>
      <Link to="/historico" className="font-bold hover:text-emerald-300 transition-colors uppercase">
        📜 Histórico 
      </Link>
    </nav>
  );
}