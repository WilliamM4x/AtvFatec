import { LinearStructure } from "@/models/LinearStruture";

export class List<T> extends LinearStructure<T> {
  public constructor(name = "Lista") {
    super(name);
  }

  public remove(): T | undefined {
    return this.items.pop();
  }

  public peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  public removeAt(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }

  public getAt(index: number): T | undefined {
    return this.items[index];
  }

  public getStructure(): number {
    return LinearStructure.getCreatedStructures();
  }
}
