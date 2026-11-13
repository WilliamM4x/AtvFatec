export interface EstruturaInfo{
    id: number;
    name: string;
}

export interface StackResponse{
    estrutura: EstruturaInfo;
    tamanho: number;
    itens: any[];
}


export interface PeekResponse {
  topo: any;
}

export interface StatsResponse {
  Estruturas: number; 
  Pilha: number;      
  Fila: number;       
  Lista: number;     
}

export interface ListResponse {
  estrutura: EstruturaInfo;
  tamanho: number;
  itens: any[];
}

export interface QueueResponse {
  estrutura: EstruturaInfo;
  tamanho: number;
  itens: any[];
}