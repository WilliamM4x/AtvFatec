import { Request, Response } from "express";
import { queue } from "../models/instances";

export class QueueController{
    public add(req: Request, res: Response){
        const {item} = req.body;
        if(item === undefined){
            res.status(400).json({erro: "O campo da requisição precisa de um item."});
            return;
        }
        queue.add(item);
        res.status(201).json({mensagem: "Item adicionado na fila."});
    }

    public remove(_req: Request, res: Response){
        const removed = queue.remove();
        
        if (removed === undefined) {
        res.status(404).json({ erro: "A fila está vazia." });
        return;
        }

        res.json({ removido: removed });
    }

    public peek(_req: Request, res: Response){
        const top = queue.peek();

        if (top === undefined) {
        res.status(404).json({ erro: "A fila está vazia." });
        return;
        }

        res.json({ topo: top });
    }

    public getAll(_req: Request, res: Response){
        res.json({
            estrutura: {
                id: queue.getId(),
                name: queue.name,
            },
            tamanho: queue.getSize(),
            itens: queue.getItems(),
        });
    }

    public clear(_req: Request, res: Response){
        queue.clear();
        res.json({ mensagem: "Fila limpa!" });
    }
}