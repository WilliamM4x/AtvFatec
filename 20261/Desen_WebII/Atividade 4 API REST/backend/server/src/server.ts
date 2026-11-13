import "dotenv/config";
import express, { Request, Response } from "express";
import { routes } from "@/routes";

import cors from 'cors'; // Adicione este import

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", routes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});
