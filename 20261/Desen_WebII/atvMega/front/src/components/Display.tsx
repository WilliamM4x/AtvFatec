import { useContext } from "react";
import { LetterContext, type ContextProps } from "../context/Ctx";
import Ball from "./Ball";

export default function Display() {
    const context = useContext(LetterContext);

    if (!context || context.concurso === undefined) {
        return (
            <div className="text-gray-500 animate-pulse mt-4">
                Buscando informações...
            </div>
        );
    }

    if (context.concurso === null) {
        if (context.erro) {
            return (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded shadow-sm max-w-md w-full text-center">
                    <h2 className="text-red-700 font-bold">
                        ⚠️ {context.erro}
                    </h2>
                </div>
            );
        }
        return null;
    }

    const dezenas = [
        context.concurso.bola1, context.concurso.bola2, context.concurso.bola3,
        context.concurso.bola4, context.concurso.bola5, context.concurso.bola6
    ];

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                borderRadius: '8px',
                border: '1px solid #10b981',
                backgroundColor: "#ecfdf5",
                fontSize: '16px',
                width: "300px",
                minHeight: "50px",
                padding: "10px",
                overflowWrap: 'break-word',
                fontWeight: "bold",
                maxHeight: '150px',       // Define até onde a caixa pode crescer
                overflowY: 'auto',        // passar de 150px, cria uma barra de rolagem vertical!
                wordBreak: 'break-all'
            }}
        >
            <div className="flex gap-2 flex-wrap justify-center">
                {dezenas.map((n, i) => (
                    <Ball key={i} char={n} />
                ))}
            </div>
        </div>
    );
}