import {useState, useEffect} from 'react';
import api from '@/services/api';
import type { ListResponse } from '@/types/api';

const ListaPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [dadosLista, setDadosLista] = useState<ListResponse | null>(null);
    const [itemTopo, setItemTopo] = useState<any>(null);
    const [inputIndex, setInputIndex] = useState('');
    const [itemIndex, setItemIndex] = useState<any>(null);

    const carregarLista = async () => {
        try {
            const response = await api.get<ListResponse>('/lista');
            setDadosLista(response.data);
        
        } catch(error){
            console.error('Erro ao carregar a lista:', error);
        }
    };

    useEffect(() => {carregarLista();}, [])

    const handleAdd = async() => {
        if(inputValue.trim() === '') return;
        try{
            await api.post('/lista', { item: inputValue });
            setInputValue('');
            await carregarLista();
        }catch(error){
            alert("Erro ao adicionar na lista");
        }
    };

    const handleRemoveAt = async (index: number) => {
        try {
            await api.delete(`/lista/${index}`);
            await carregarLista();
        } catch (error) {
            alert("Erro ao remover item do índice " + index);
        }
    };

    const handleClear = async () => {
        try{
            await api.delete('/lista/limpar');
            await carregarLista();
        }catch(error){
            alert("Erro ao limpar a lista");
        }
    };

    const handlePeek = async () => {
        try{
            const response = await api.get('/lista/ultimo');
            setItemTopo(response.data.topo);
            setTimeout(() => setItemTopo(null), 3000);
        }catch(error){
            alert("Lista está vazia");
        }
    };

    const handlePop = async () => {
        try{
            await api.delete('/lista');
            await carregarLista();
        }catch(error){
            alert("Lista já está vazia");
        }
    };

    const handleGetAt = async (index: number) => {
        try{
            const response = await api.get(`/lista/${index}`);
            setItemIndex(response.data.item);
            setTimeout(() => setItemIndex(null), 3000);
        }catch(error){
            alert("Erro ao obter item do índice " + index);
        }
    };

    return(
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {dadosLista?.estrutura.name || 'Lista'}
            </h1>

            <div className='flex gap-2 mb-6'>
                <input
                    className='border p-2 flex-1 rounded'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Valor...'
                    />
                
                <button 
                    onClick={handleAdd} 
                    className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Adicionar
                </button>
            </div>
            <p className="mb-2 text-sm text-gray-600">
                    Itens na estrutura: {dadosLista?.tamanho || 0}
            </p>

            <div className='flex gap-2 mb-6'>
                <input
                    className='border p-2 flex-1 rounded'
                    value={inputIndex}
                    onChange={(e) => setInputIndex(e.target.value)}
                    placeholder='Indice...'
                    />
                
                <button 
                    onClick={() => handleGetAt(Number(inputIndex))} 
                    className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Obter Item
                </button>
            </div>
            
            <div className="flex gap-2 mt-2 mb-2">
                <button
                    onClick={handlePeek}
                    className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition font-bold"
                >
                    Item do topo
                </button>

            </div>
            
            {itemTopo !== null && (
            <div className="mt-4 p-3 mb-5 gap-4 bg-teal-100 border-l-4 border-teal-500 text-teal-800 animate-pulse">
                <strong>Item no topo:</strong> {String(itemTopo)}
            </div>
            )}

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

            {itemIndex !== null && (
            <div className="mt-4 p-3 mb-5 gap-4 bg-teal-100 border-l-4 border-teal-500 text-teal-800 animate-pulse ">
                <strong>Item :</strong> {String(itemIndex)}
            </div>)}
        
            <div className="flex flex-col gap-2 mt-4">
                {dadosLista?.itens.map((item, index) => (
                    <div key={index} className="p-3 bg-white border rounded shadow-sm flex justify-between">
                        <span>{String(item)}</span>
                        {/* Botão de remover por índice que falta na sua lista */}
                        <button onClick={() => handleRemoveAt(index)} className="text-red-500 text-sm">Remover</button>
                    </div>
                ))}
            </div>
                
            
        </div>
 
    );

};

export default ListaPage;