import { BrowserRouter, Link, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Rotas />
    </BrowserRouter>
  );
}

function Rotas() {
  return (
    <Routes>
      <Route path="*" element={<Erro />} />
      <Route path="/manha" element={<Manha />} />
      <Route path="/tarde" element={<Tarde />} />
      <Route path="/noite" element={<Noite />} />
      <Route path="/madrugada" element={<Madrugada />} />
    </Routes>
  );
}

function Menu() {
  return (
    <div>
      <Link to="/manha">Manhã</Link>
      <Link to="/tarde">Tarde</Link>
      <Link to="/noite">Noite</Link>
      <Link to="madrugada">Madrugada</Link>
    </div>
  );
}

function Manha() {
  return <div style={{ backgroundColor: "yellow" }}>Bom dia</div>;
}

function Tarde() {
  return <div style={{ backgroundColor: "orange" }}>Boa tarde</div>;
}

function Noite() {
  return <div style={{ backgroundColor: "#912222" }}>Boa noite</div>;
}

function Madrugada() {
  return <div style={{ backgroundColor: "#777" }}>Bom sono</div>;
}

function Erro() {
  return <div>Rota inexistente</div>;
}
