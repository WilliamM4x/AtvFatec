import { useContext } from "react";
import { LetterContext } from "../context/Ctx";
import Ball from "../components/Ball";

export default function Palpite() {
  const { palpite, gerarPalpite } = useContext(LetterContext)!;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-3xl font-bold text-emerald-900 mb-10">Gerador de Sorte</h1>

      {palpite.length > 0 && (
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-10 shadow-2xl mb-10 transform animate-bounce-short">
          <div className="flex gap-4 flex-wrap justify-center">
            {palpite.map((num, i) => (
              <Ball key={i} char={num} />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={gerarPalpite}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-12 rounded-full shadow-lg hover:shadow-emerald-200 transition-all active:scale-90"
      >
        {palpite.length > 0 ? "GERAR NOVO PALPITE" : "QUERO MEU PALPITE"}
      </button>
    </div>
  );
}