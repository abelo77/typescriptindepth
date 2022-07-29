import { ReferenceItem } from "../classes";

class Encyclopedia extends ReferenceItem {
  constructor(title: string, year: number, id: number, public edition: number) {
    super(title, year, id);
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
