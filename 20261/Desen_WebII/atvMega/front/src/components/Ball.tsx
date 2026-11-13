import styled from 'styled-components';

interface BallProps {
    char: string | number;
}

const BallContainer = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #209677; 
    color: white;
    font-weight: bold;
    font-size: 18px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 5px;
`;

export default function Ball({ char }: BallProps) {
    return <BallContainer>{char}</BallContainer>;
}