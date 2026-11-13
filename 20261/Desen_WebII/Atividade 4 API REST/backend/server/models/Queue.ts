import { LinearStructure } from "@/models/LinearStruture";

export class Queue<T> extends LinearStructure<T> {
  public constructor(name = "Fila") {
    super(name);
  }

  public remove(): T | undefined {
    return this.items.shift();
  }

  public peek(): T | undefined {
    return this.items[0];
  }
}
