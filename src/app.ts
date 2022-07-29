import { getAllBooks, logSearchResults } from './functions';
import { Category } from './enums';

//
// logFirstAvailable(getAllBooks());
// console.log('Javascript books:');
// logBookTitles(getBookTitlesByCategory(Category.Javascript));
// console.log('CSS books:');
// logBookTitles(getBookTitlesByCategory(Category.CSS));
//
// console.log('getBookAuthorByIndex 1', getBookAuthorByIndex(1));
// console.log('calcTotalPages', calcTotalPages());

// const createCustomerID = (name: string, id: number): string => `${name} ${id}`;
// const myID = createCustomerID('Ann', 10);
//
// type myFn = typeof createCustomerID;
//
// let idGenerator: myFn;
// idGenerator = createCustomerID;

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

// const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
//
// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };

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

// const refBook = new RefBook('Ann', 2020, 100, 2);
// refBook.printItem();
//
// refBook.publisher = 'Boris';
// console.log('_Publisher ', refBook.publisher);
// console.log('ref', refBook);
// console.log('getID()', refBook.getID());
// refBook.printCitation();
//
// const favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Ann';
// favoriteLibrarian.assistCustomer('USA Gov', 'How to help people?');
//
// const personBook: PersonBook = {
//     name: 'Ann',
//     title: 'How to',
//     email: 'personal@email.com',
//     markDamaged: param => {},
//     available: true,
//     category: Category.Angular,
//     pages: 1000,
//     id: 1000,
//     author: 'Epamers',
// };
//
// const setDefaultConfig = (options: TOptions) => {
//     options.duration ??= 100;
//     options.speed ??= 1;
//     return options;
// };
//
// const options: TOptions = {
//     duration: 5,
// };
// // console.log(setDefaultConfig(options));
// // printRefBook(refBook);
// // const universityLib = new UniversityLibrarian();
// // printRefBook(universityLib);
//
// const flag = true;
//
// if (flag) {
//     // import('./classes').then(obj => {
//     //     const reader = new obj.Reader();
//     //     console.log('Reader', reader);
//     // });
//     const obj = await import('./classes');
//     const reader = new obj.Reader();
//     console.log('Await reader', reader);
// }
//
// //const lib = new Library();
// let lib: Library = {
//     name: 'Ann',
//     id: 1,
//     address: 'New York',
// };
//
// console.log('lib: Library', lib);

// const inventory = [
//     { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
// ];

// console.log('purge array of books', purge(inventory));
// console.log('purge array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]', purge([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));

// const bookShelf = new Shelf();
// inventory.forEach(item => bookShelf.add(item));
// console.log('First book on shelf', bookShelf.getFirst());
//
// const magazines = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' },
// ];
//
// const magazineShelf = new Shelf();
// magazines.forEach(item => magazineShelf.add(item));
// console.log('First magazine on shelf', magazineShelf.getFirst());
// magazineShelf.printTitles();
// console.log('Find Five Points', magazineShelf.find('Five Points'));
//
// console.log(
//     'getObjectProperty(magazineShelf.find(Five Points, title)',
//     getObjectProperty(magazineShelf.find('Five Points'), 'title'),
// );
//
// const params: Parameters<CreateCustomerFunctionType> = ['Test', 22];
// createCustomer(...params);

// const u = new UniversityLibrarian();
// u.name = 'Anna';
// console.log(u);
// u.assistCustomer('Fedot', 'Goover');
// console.log(u.name);
// u['printLibrarian']();
// u.teachCommunity = () => {
//     console.log('None');
// };

// const e = new Encyclopedia('Enc', 2020, 1, 5);
// e.copies = 10;
// e.printItem();

const books = getAllBooks();
console.log('Begin');
// getBooksByCategory(Category.Javascript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// getBooksByCategoryPromise(Category.Javascript)
//     .then(data => {
//         console.log('Titles promise: ', data);
//         return Promise.resolve(data.length);
//     })
//     .then(count => console.log('Books count', count))
//     .catch(err => console.log('Error promise: ', err));
logSearchResults(Category.Software).catch(e => console.log(e));

console.log('End');
