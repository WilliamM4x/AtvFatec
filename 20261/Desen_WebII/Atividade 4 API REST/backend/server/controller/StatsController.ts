import { Request, Response } from "express";
import { queue } from "@/models/instances";
import { list } from "@/models/instances";
import { stack } from "@/models/instances";

export class statsController {
  public getStats(_req: Request, res: Response) {
    res.json({
      Estruturas: list.getStructure(),
      Pilha: stack.getSize(),
      Fila: queue.getSize(),
      Lista: list.getSize(),
    });
  }
}
