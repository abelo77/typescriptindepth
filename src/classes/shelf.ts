import { ShelfItem } from '../interfaces';

class Shelf<T extends ShelfItem> {
    items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    find(titleToFind: string): T {
        return this.items.find(item => item?.title === titleToFind);
    }

    printTitles() {
        this.items.forEach(item => console.log(`Title: ${item?.title}`));
    }
}

export default Shelf;
