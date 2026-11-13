import { useContext } from "react";
import { LetterContext, type ContextProps } from "../context/Ctx";
import Ball from "./Ball";

export default function RecentDisplay(){
    const context = useContext(LetterContext) as ContextProps;

    if (!context || !context.concursoRecente) { 
        return <div>Carregando concurso mais recente...</div>;
    }

    const { concursoRecente } = context;

    const dezenas = [
        concursoRecente.bola1, concursoRecente.bola2, concursoRecente.bola3, 
        concursoRecente.bola4, concursoRecente.bola5, concursoRecente.bola6
    ];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">Evento Mais Recente: Concurso {concursoRecente.concurso}</h2>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign:"center",
                    justifyContent: "center",
                    borderRadius: '8px',
                    border: '1px solid #10b981',
                    fontSize: '16px',
                    width: "350px",
                    minHeight:"80px",
                    padding: "10px",
                    backgroundColor: "#ecfdf5",
                    fontWeight:"bold",
                }}
            >
                {dezenas.map((char, index)=>(
                    <Ball key={index} char={char} />
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">Sorteio realizado em: {new Date(concursoRecente.data_do_sorteio).toLocaleDateString()}</p>
        </div>
    );
}