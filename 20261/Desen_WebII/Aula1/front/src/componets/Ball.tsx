interface BallProps {
    char: string;
}

export default function Ball({ char }: BallProps) {
    return (
        <span
            style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'cyan', // A cor que você pediu
                color: 'white',             // Letra branca para dar contraste
                fontWeight: 'bold',
                fontSize: '18px',
                width: '35px',              // Largura fixa
                height: '35px',             // Altura igual à largura para ficar quadrado...
                borderRadius: '50%'     // ...e 50% de borda transforma o quadrado em um círculo perfeito!

            }}
        >
            {char}
        </span>
    );
}
