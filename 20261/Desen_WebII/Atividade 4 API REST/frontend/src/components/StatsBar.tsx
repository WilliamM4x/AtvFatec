import { useState, useEffect } from 'react';
import api from '@/services/api';
import type { StatsResponse } from '@/types/api';

const StatsBar = () => {
    const [stats, setStats] = useState<StatsResponse|null>(null);

    const carregarStats = async () => {
        try{
            const response = await api.get<StatsResponse>('/estatisticas');
            setStats(response.data);
        }catch(error){
            console.error("Erro ao carregar estatísticas:", error);
        }
    };

    useEffect(() => {
        carregarStats();
        const interval = setInterval(carregarStats, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return null;

  return (
    <div className="bg-gray-100 border-b border-gray-300 py-2">
      <div className="container mx-auto flex justify-around text-sm font-medium text-gray-700">
        <div>Total de Estruturas: <span className="text-blue-600">{stats.Estruturas}</span></div>
        <div>Itens na Pilha: <span className="text-blue-600">{stats.Pilha}</span></div>
        <div>Itens na Fila: <span className="text-blue-600">{stats.Fila}</span></div>
        <div>Itens na Lista: <span className="text-blue-600">{stats.Lista}</span></div>
      </div>
    </div>
  );

};

export default StatsBar;