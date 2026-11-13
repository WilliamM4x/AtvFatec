import { useContext } from "react"
import { LetterContext, type ContextProps } from "../context/Ctx"

export default function Input() {
    const { entrada, setEntrada } = useContext(LetterContext) as ContextProps;
    return (
        <input

            style={
                {
                    borderRadius: '8px',
                    border: '1px solid black',
                    fontSize: '16px',
                    width: "300px",
                    minHeight: "25px",
                    padding: "10px",
                    overflowWrap: 'break-word'
                }
            }
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Entre com números separados por espaço"
        />

    );
}