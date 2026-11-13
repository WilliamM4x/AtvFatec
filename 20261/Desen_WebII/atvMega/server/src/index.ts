import express, {Request, Response} from "express";
import dotenv from "dotenv";
import routes  from "./routes/index.js";
import cors from 'cors';

dotenv.config();

const app= express();

app.use(cors());
app.use(express.json());//Midwhere
const PORT = process.env.SERVER_PORT;

app.use(routes)

app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`);
});

//curl -X POST http://localhost:3000/create -d '{"nome": "Ana", "idade":22}' -H "Content-Type: application/json"
//curl -X DELETE http://localhost:3000/remove/12
