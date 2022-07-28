import { ReferenceItem } from "../classes";
import { positiveInteger } from "../decorators";

class Encyclopedia extends ReferenceItem {
  constructor(title: string, year: number, id: number, public edition: number) {
    super(title, year, id);
  }

  private _copies: number;

  get copies(): number {
    return this._copies;
  }

  @positiveInteger
  set copies(value: number) {
    this._copies = value;
  }

  override printItem() {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  override printCitation() {
    console.log(`${this.title} - ${this.year}`);
  }

}

export default Encyclopedia;
