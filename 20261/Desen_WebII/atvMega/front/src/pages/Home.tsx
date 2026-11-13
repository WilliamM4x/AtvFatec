import { useContext } from 'react';
import { LetterContext, type ContextProps } from '@/context/Ctx';
import Display from '@/components/Display';
import RecentDisplay from '@/components/RecentDisplay';


export default function Home() {
  const {entrada, setEntrada, carregarConcurso} = useContext(LetterContext) as ContextProps;
  
  const handleBusca= ()=>{
    if (entrada.trim() !==""){
      carregarConcurso(entrada)
    } else {
      alert("Por favor, digite o número do concurso.");
    }
  };

  return(

    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50 gap-10">
    
    <div className="w-full flex justify-center bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <RecentDisplay />
    </div>

    <hr className="w-full max-w-2xl border-gray-200" />

    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Busca de Concursos
      </h1>
      
      <div className="flex gap-4 mb-8 w-full max-w-md">
        <input
          type="number"
          placeholder="Digite o número do concurso"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <button 
          onClick={handleBusca}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
        >
          Buscar
        </button>
      </div>

      <div className="w-full flex justify-center">
        <Display />
      </div>
    </div>
  </div>
  );
}