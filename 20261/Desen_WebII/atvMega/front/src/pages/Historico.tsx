import { useContext, useEffect, useState } from "react";
import { LetterContext } from "../context/Ctx";
import Ball from "../components/Ball";

export default function Historico() {
  const { historico, carregarHistorico } = useContext(LetterContext)!;
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    carregarHistorico(pagina * 15);
  }, [pagina]); // Recarrega sempre que a página mudar

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Histórico de Concursos</h1>

      {/* Lista de Concursos */}
      {historico.map((c) => {
        const dataFormatada = new Date(c.data_do_sorteio).toLocaleDateString('pt-BR');
        return (
          <div className="w-full max-w-4xl space-y-4">
            <div key={c.concurso} className="flex items-center justify-between p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
              <span className="font-bold text-gray-600">Nº {c.concurso}</span>
              <div className="flex gap-2 scale-75">
                {[c.bola1, c.bola2, c.bola3, c.bola4, c.bola5, c.bola6].map((n, i) => (
                  <Ball key={i} char={n} />
                ))}
              </div>
              <span className="text-sm text-gray-400">{dataFormatada}</span>
            </div>
          </div>
        );
      })}


      {/* Controles de Paginação */}
      <div className="flex gap-8 mt-10 items-center">
        <button
          disabled={pagina === 0}
          onClick={() => setPagina(pagina - 1)}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:bg-gray-300 font-bold shadow-md active:scale-95 transition-all"
        >
          ⬅️ Anterior
        </button>
        <span className="font-bold text-emerald-800 text-xl">Página {pagina + 1}</span>
        <button
          onClick={() => setPagina(pagina + 1)}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-md active:scale-95 transition-all"
        >
          Próxima ➡️
        </button>
      </div>
    </div>
  );
}