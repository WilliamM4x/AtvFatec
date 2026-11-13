import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PilhaPage from '@/pages/PilhaPage';
import StatsBar from '@/components/StatsBar';
import ListaPage from '@/pages/ListaPage';
import FilaPage from '@/pages/FilaPage';

function App() {
  return (
    <BrowserRouter>
     
      <nav className="bg-slate-800 p-4 text-white shadow-lg">
        <div className="container mx-auto bg-center flex justify-center items-center gap-6">
          <Link to="/pilha" className="hover:text-blue-400 font-semibold transition">Pilha</Link>
          <Link to="/fila" className="hover:text-blue-400 font-semibold transition">Fila</Link>
          <Link to="/lista" className="hover:text-blue-400 font-semibold transition">Lista</Link>
        </div>
      </nav>
      <StatsBar />

      <main className="container mx-auto mt-8 p-4">
        <Routes>
          <Route path="/pilha" element={<PilhaPage />} />
          <Route path="/fila" element={<FilaPage />} />
          <Route path="/lista" element={<ListaPage />} />
          <Route path="/" element={<h1 className="text-2xl">Selecione uma estrutura no menu acima.</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;