import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "@/pages/Home";
import Palpite from "@/pages/Palpite";
import Historico from "@/pages/Historico";
import { LetterProvider } from "./context/Ctx";
import Headers from '@/components/Header';

export default function App() {
  return (
    <LetterProvider>
       <BrowserRouter>
        <Headers/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/palpite" element={<Palpite />} />
          
           <Route path="/historico" element={<Historico />} />
        </Routes>
      </BrowserRouter>
    </LetterProvider>
  );
}

