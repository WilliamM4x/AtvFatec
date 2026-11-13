import Display from "./componets/Display";
import Input from "./componets/Input";
import { LetterProvider } from "./contexts/Ctx";

export default function App() {
  return (
    <LetterProvider>
      <div
        style={{
          
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
          gap: '20px'
        }}>
        <div
          style={{
            borderRadius: '8px',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            height: '30%',
            gap: '20px'
          }}>

        <Input />
        <Display />
   
      </div>

      </div>
     
       
    </LetterProvider>
  );
}

