import express from "express";
import mongoose from "mongoose";
import path from "path";
import clienteRoutes from "./routes/clientRoutes";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cadastroDB")
    .then(()=>{
        console.log("Conectado ao MongoDB")
    })
    .catch((erro)=>{
        console.error("Erro ao conectar ao MongoDB", erro)
    });

app.use("/clientes", clienteRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
