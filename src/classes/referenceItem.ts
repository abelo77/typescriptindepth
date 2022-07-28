abstract class ReferenceItem {
    static department = 'default department';

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    // year: number;
    #id: number;

    protected constructor(public title: string, protected year: number, id: number) {
        this.#id = id;
    }

    // title: string;
    private _publisher: string;

    get publisher() {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher) {
        this._publisher = newPublisher;
    }

    printItem(): void {
        console.log(
            `${this.title} was published in ${this.year}, department ${
                Object.getPrototypeOf(this).constructor.department
            }`,
        );
    }

    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

export { ReferenceItem };
