import {useState, useEffect} from 'react';
import api from '@/services/api';
import type { StackResponse, PeekResponse } from '@/types/api';

const PilhaPage= () => {
    const[inputValue, setInputValue] = useState('');
    const[dadosPilha, setDadosPilha] = useState<StackResponse|null>(null);
    const [itemNoTopo, setItemNoTopo] = useState<any>(null);

    const carregarPilha = async()=>{
        try{
            const response = await api.get<StackResponse>('/pilha');
            setDadosPilha(response.data);
        }catch (error){
            console.error("Erro ao carregar:", error);
        }
    };

    useEffect(() => {carregarPilha();}, []);

    const handlePush = async()=> {
        if (!inputValue.trim()) return;
        try{
            await api.post('/pilha', { item: inputValue.trim() });
            setInputValue('');
            carregarPilha();
        }catch(error){
            console.error("Erro ao empilhar:", error);
        }
    };

    const handlePop = async() => {
         try{
            await api.delete('/pilha');
            await carregarPilha();
        }catch(error){
            alert("A pilha já está vazia!");
        }
    };

    const handleClear = async() =>{
        try {
            await api.delete('/pilha/limpar');
            await carregarPilha();
        } catch (error) {
            console.error("Erro ao limpar pilha:", error);
        }
    };

    const handlePeek = async () => {
    try {
      const response = await api.get<PeekResponse>('/pilha/topo');
      setItemNoTopo(response.data.topo);
      
      setTimeout(() => setItemNoTopo(null), 3000);
    } catch (error) {
      alert("Pilha vazia! Não há nada no topo.");
    }
  };


    return (
    <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
            {dadosPilha?.estrutura.name || 'Pilha'}
        </h1>

        <div className="flex gap-2 mb-6">
            <input 
            className="border p-2 flex-1 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Valor..."
            />
            <button onClick={handlePush} className="bg-blue-600 text-white px-4 py-2 rounded">
            Inserir
            </button>

            </div>

            <div className="flex gap-2">
                <button
                    onClick={handlePop}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-bold"
                >
                    Pop (Remover Topo)
                </button>
                <button
                    onClick={handleClear}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-bold"
                >
                    Limpar Tudo
                </button>
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={handlePeek}
                    className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition font-bold"
                >
                    Item do topo
                </button>
            </div>

            {itemNoTopo !== null && (
                <div className="mt-4 p-3 bg-teal-100 border-l-4 border-teal-500 text-teal-800 animate-pulse">
                    <strong>Item no topo:</strong> {String(itemNoTopo)}
                </div>
            )}

            <p className="mb-2 text-sm text-gray-600">
                Itens na estrutura: {dadosPilha?.tamanho || 0}
            </p>

            <div className="flex flex-col-reverse gap-2 bg-gray-100 p-4 rounded-lg min-h-50">
                {dadosPilha?.itens.map((item, index) => (
            <div key={index} className="bg-white border-2 border-blue-400 p-3 text-center rounded shadow-sm">
                {String(item)}
            </div>
            ))}
        </div>
    </div>
  );

};

export default PilhaPage;