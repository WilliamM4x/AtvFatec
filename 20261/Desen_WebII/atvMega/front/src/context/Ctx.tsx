import { createContext, useState, useEffect } from "react";
import api from '@/services/api';



export interface ContextProps {
  entrada: string;
  setEntrada(value: string): void;

  concurso: ConcursoProps | null| undefined;
  concursoRecente: ConcursoProps | null; // Novo estado para o concurso mais recente
  carregarConcurso(numero: string): Promise<void>;
  erro: string | null;

  palpite: number[];
  gerarPalpite:() => void;

  historico: ConcursoProps[];
  carregarHistorico: (pular: number) => Promise<void>;
}

export interface ConcursoProps {
  concurso: number;
  data_do_sorteio: string;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
  ganhadores_6_acertos: number;
  rateio_6_acertos: string;
  acumulado_6_acertos: string;
  estimativa_premio: string;
}


interface ChildrenProps {
  children: React.ReactNode;
}

const LetterContext = createContext<ContextProps | null | undefined>(undefined);

function LetterProvider({ children }: ChildrenProps) {
  const [entrada, setEntrada] = useState("");
  const [concurso, setConcurso] = useState<ConcursoProps | null| undefined>(null);
  const [concursoRecente, setConcursoRecente] = useState<ConcursoProps | null>(null); // Estado para o mais recente
  const [erro, setErro] = useState<string | null>(null);
  const [palpite, setPalpite] = useState<number[]>([]);
  const [historico, setHistorico] = useState<ConcursoProps[]>([]);

  async function carregarHistorico(pular: number) {
    try {
        const { data } = await api.get(`/concurso/historico?pular=${pular}`); 
        const lista = data.rows ? data.rows : data;
        setHistorico(lista);
    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
    }
}

  const gerarPalpite = ()=>{
    const numeros : number[] = [];
    
    while (numeros.length < 6){
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(numero)){
        numeros.push(numero);
      }
    }
    setPalpite(numeros);
  };

  async function carregarConcurso(numero?: string) {
    setConcurso(undefined);
    setErro(null);
    try {
      const rota = numero ? `/concurso/${numero}` : "/concurso/recente";
      const { data } = await api.get<any>(rota);
      if (data.menssage || data.message || data.erro) {
        setErro(data.menssage || data.message || data.erro);
        setConcurso(null);
      } else {
        setConcurso(data);
      }

    } catch (error: any) {
      setConcurso(null); // Garante que saia do estado "Buscando informações..."
      if (error.response && error.response.status === 404) {
        setErro(error.response.data?.menssage || error.response.data?.message || "Concurso não encontrado.");
      } else {
        setErro(error.response?.data?.menssage || error.response?.data?.message || "Erro de conexão com a API.");
        console.error("Erro na API:", error);
      }
    }
  }
  async function carregarRecente() {
    try {
      const { data } = await api.get<ConcursoProps>("/concurso/recente");
      setConcursoRecente(data);
    } catch (error) {
      console.error("Erro ao carregar concurso recente:", error);
    }
  }
  useEffect(() => {
    carregarRecente();
  }, []);

  useEffect(() => {
    setErro(null);
    if (entrada.trim() === "") {
      setConcurso(null);
    }
  }, [entrada]);


  return (
    <LetterContext.Provider value={{ 
      entrada, setEntrada, 
      concurso, concursoRecente, carregarConcurso, erro,
      palpite, gerarPalpite,
      historico, carregarHistorico
    }}>
      {children}
    </LetterContext.Provider>
  );
}


export { LetterContext, LetterProvider }