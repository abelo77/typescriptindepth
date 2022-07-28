/* eslint-disable no-redeclare */

enum Category {
  Javascript,
  CSS,
  HTML,
  TypeScript,
  Angular,
}

interface DamageLogger {
  (param: string): void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
  pages?: number;
  markDamaged?: DamageLogger;
}

type BookProperties = keyof Book;

type BookOrUndefined = Book | undefined;

interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer: (custName: string, bookTitle: string) => void;
}

interface TOptions {
  duration?: number;
  speed?: number;
}

// interface Lib {
//     lib: string;
//     books: number;
//     avgPagesPerBook: number;
// }
//

abstract class ReferenceItem {
  static department = "default department";

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
    console.log(`${this.title} was published in ${this.year}, department ${Object.getPrototypeOf(this).constructor.department}`);
  }

  getID(): number {
    return this.#id;
  }

  abstract printCitation(): void;
}

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

class UniversityLibrarian implements Librarian {
  name: string;
  department: string;
  email: string;

  assistCustomer(custName: string, bookTitle: string): void {
    console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
  }
}

type PersonBook = Person & Book;

const getAllBooks = (): readonly Book[] => {
  const books: readonly Book[] = [
    {
      id: 1,
      title: "Refactoring JavaScript",
      author: "Evan Burchard",
      available: true,
      category: Category.Javascript
    },
    {
      id: 2,
      title: "JavaScript Testing",
      author: "Liang Yuxian Eugene",
      available: false,
      category: Category.Javascript
    },
    { id: 3, title: "CSS Secrets", author: "Lea Verou", available: true, category: Category.CSS },
    {
      id: 4,
      title: "Mastering JavaScript Object-Oriented Programming",
      author: "Andrea Chiarelli",
      available: true,
      category: Category.Javascript
    }
  ] as const;
  return books;
};

const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
  console.log(
    "First available",
    books.find(({ available }) => available)
  );
};

const getBookTitlesByCategory = (categoryForFilter: Category = Category.Javascript): string[] => {
  const books = getAllBooks();
  return books.filter(({ category }) => category === categoryForFilter).map(({ title }) => title);
};

// const logBookTitles = (titles: string[]): void => {
//     titles.forEach(item => console.log(item));
// };
//
// const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
//     const book = getAllBooks()[index];
//     return [book?.title, book?.author];
// };
//
// export const calcTotalPages = () => {
//     const books: readonly Lib[] = [
//         { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
//         { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
//         { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
//     ] as const;
//
//     return books
//         .map(({ avgPagesPerBook, books }) => BigInt(avgPagesPerBook) * BigInt(books))
//         .reduce((prev, current): bigint => {
//             return prev + current;
//         }, BigInt(0));
// };
//
// logFirstAvailable(getAllBooks());
// console.log('Javascript books:');
// logBookTitles(getBookTitlesByCategory(Category.Javascript));
// console.log('CSS books:');
// logBookTitles(getBookTitlesByCategory(Category.CSS));
//
// console.log('getBookAuthorByIndex 1', getBookAuthorByIndex(1));
// console.log('calcTotalPages', calcTotalPages());

const createCustomerID = (name: string, id: number): string => `${name} ${id}`;
const myID = createCustomerID("Ann", 10);

type myFn = typeof createCustomerID;

let idGenerator: myFn;
idGenerator = createCustomerID;

const createCustomer = (name: string, age?: number, city?: string): void => {
  console.log("Name", name);
  if (age) {
    console.log("age", age);
  }
  if (city) {
    console.log("city", city);
  }
};

const getBookByID = (bookId: Book["id"]): BookOrUndefined => {
  const allBooks = getAllBooks();
  return allBooks.find(({ id }) => id === bookId);
};

const printBook = (book: Book): void => {
  console.log(`${book.title} by ${book.author}`);
};

const checkoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
  console.log("Customer: ", customer);
  return bookIDs.map(id => {
    const book = getBookByID(id);
    return book?.title;
  });
};

function getTitles(author: string): Book[];
function getTitles(available: boolean): Book[];
function getTitles(id: number, available: boolean): Book[];
function getTitles(...args: any[]): Book[] {
  // [string | boolean] | [number, boolean]
  const books = getAllBooks();
  if (args.length === 1) {
    const [arg] = args;
    const t = typeof arg;
    if (t === "string") {
      return books.filter(({ author }) => author === arg);
    } else if (t === "boolean") {
      return books.filter(({ available }) => available === arg);
    } else {
      return [];
    }
  } else if (args.length === 2) {
    const [idParam, availableParam] = args;
    if (typeof idParam === "number" && typeof availableParam === "boolean") {
      return books.filter(({ id, available }) => id === idParam && available === availableParam);
    } else {
      return [];
    }
  }
  return [];
}

function assertStringValue(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("value should have been a string");
  }
}

const bookTitleTransform = (title: any) => {
  assertStringValue(title);
  // return [...title].reverse().join('');
  return title.split("").reverse().join("");
};

// console.log('createCustomerID(Ann, 10)', myID);
// console.log('idGenerator(John, 22)', idGenerator('John', 22));
// createCustomer('Ann');
// createCustomer('Ann', 22);
// createCustomer('Ann', 22, 'Paris');
// getBookTitlesByCategory();
// logFirstAvailable();
// getBookByID(1);
//
// const myBooks = checkoutBooks('Ann', 1, 4);
// console.log('myBooks', myBooks);
// console.log('getTitles(Liang Yuxian Eugene)', getTitles('Liang Yuxian Eugene'));
// console.log('getTitles(false)', getTitles(true));
// console.log('getTitles(2, true)', getTitles(2, true));
// console.log('getTitles(3, true)', getTitles(3, true));
//
// const checkedOutBooks = getTitles(false);
// console.log('checkerOutBooks', checkedOutBooks);
//
// console.log(bookTitleTransform('Typescript'));
// console.log(bookTitleTransform(100));

const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);

const myBook: Book = {
  id: 5,
  title: "Colors, Backgrounds, and Gradients",
  author: "Eric A. Meyer",
  available: true,
  category: Category.CSS,
  pages: 200,
  markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};

// printBook(myBook);
// myBook.markDamaged('missing back cover');

// logDamage('missing back cover');

// const favoriteAuthor: Author = {
//   name: "sir Arthur Conan Doyle",
//   email: "arturka@konan.gr",
//   numBooksPublished: 1
// };
//
// const favoriteLibrarian: Librarian = {
//   name: "Piter",
//   email: "peronal@piter.pan",
//   department: "Congress lib",
//   assistCustomer: (name: string, title: string) => {
//     return `${name} ${title}`;
//   }
// };
//
// const offer: any = {
//   book: {
//     title: "Essential TypeScript"
//   }
// };
//
// const getProperty = (book: Book, property: BookProperties): any => {
//   if (typeof book[property] === "function") {
//     return property;
//   }
//   return book[property];
// };

// console.log('offer.magazine', offer.magazine);
// console.log('offer.magazine.getTitle()', offer.magazine?.getTitle());
// console.log('offer.book.getTitle()', offer.book?.getTitle?.());
// console.log('offer.book.authors[0] ', offer.book?.authors?.[0]);

// console.log(getProperty(getAllBooks()[0], 'title'));
// console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn'));

// const ref = new Encyclopedia("Ann", 2020, 100, 2);
// ref.printItem();
//
// ref.publisher = "Boris";
// console.log("_Publisher ", ref.publisher);
// console.log("ref", ref);
// console.log("getID()", ref.getID());
const refBook = new Encyclopedia("Ann", 2020, 100, 2);
refBook.printItem();

refBook.publisher = "Boris";
console.log("_Publisher ", refBook.publisher);
console.log("ref", refBook);
console.log("getID()", refBook.getID());
refBook.printCitation();

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = "Ann";
favoriteLibrarian.assistCustomer("USA Gov", "How to help people?");


const personBook: PersonBook = {
  name: "Ann",
  title: "How to",
  email: "personal@email.com",
  markDamaged: (param) => {
  },
  available: true,
  category: Category.Angular,
  pages: 1000,
  id: 1000,
  author: "Epamers"
};

const setDefaultConfig = (options: TOptions) => {
  options.duration ??= 100;
  options.speed ??= 1;
  return options;
};

const options: TOptions = {
  duration: 5
};
console.log(setDefaultConfig(options));
