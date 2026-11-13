import { Request, Response } from "express";
import { list } from "../models/instances";

export class ListController {
  public add(req: Request, res: Response) {
    const { item } = req.body;
    if (item === undefined) {
      res
        .status(400)
        .json({ erro: "O campo da requisição precisa de um item." });
      return;
    }
    list.add(item);
    res.status(201).json({ mensagem: "Item adicionado na lista." });
  }

  public remove(_req: Request, res: Response) {
    const removed = list.remove();

    if (removed === undefined) {
      res.status(404).json({ erro: "A lista está vazia." });
      return;
    }

    res.json({ removido: removed });
  }

  public removeAt(req: Request, res: Response) {
    const { index } = req.params;

    if (index === undefined) {
      res.status(400).json({ erro: "É preciso a posição de remoção" });
      return;
    }
    const removed = list.removeAt(Number(index));

    res.json({ removido: removed });
  }

  public peek(_req: Request, res: Response) {
    const top = list.peek();

    if (top === undefined) {
      res.status(404).json({ erro: "A lista está vazia." });
      return;
    }

    res.json({ topo: top });
  }

  public getAt(req: Request, res: Response) {
    const { index } = req.params;
    if (index === undefined) {
      res.status(404).json({ erro: "É preciso a posição de remoção" });
      return;
    }

    const item = list.getAt(Number(index));

    res.json({ item });
  }

  public getAll(_req: Request, res: Response) {
    res.json({
      estrutura: {
        id: list.getId(),
        name: list.name,
      },
      tamanho: list.getSize(),
      itens: list.getItems(),
    });
  }

  public clear(_req: Request, res: Response) {
    list.clear();
    res.json({ mensagem: "Lista limpa!" });
  }
}
