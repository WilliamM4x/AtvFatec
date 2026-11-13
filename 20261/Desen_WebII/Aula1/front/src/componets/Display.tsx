import { useContext } from "react";
import { LetterContext, type ContextProps } from "../contexts/Ctx";
import Ball from "./Ball";

export default function Display(){
    const {entrada} = useContext(LetterContext) as ContextProps;
    const numeros = entrada ? 
        entrada.split(' ').filter(item => item.trim() !== '') : [];
    return <div
            style={{
                alignItems: "center",
                textAlign:"center",
                justifyContent: "center",
                borderRadius: '8px',
                border: '1px solid black',
                fontSize: '16px',
                width: "300px",
                minHeight:"50px",
                padding: "10px",
                overflowWrap: 'break-word',
                fontWeight:"bold",
                maxHeight: '150px',       // Define até onde a caixa pode crescer
                overflowY: 'auto',        // passar de 150px, cria uma barra de rolagem vertical!
                wordBreak: 'break-all'
            }}
            >
                {numeros.length === 0?
                 ("Sem entrada"):
                 (numeros.map((char, index)=>(
                    <Ball key={index} char={char} />
                ))
                )}
            </div>
}