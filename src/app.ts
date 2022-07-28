/* eslint-disable no-redeclare */

enum Category {
    Javascript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

// interface Lib {
//     lib: string;
//     books: number;
//     avgPagesPerBook: number;
// }
//
const getAllBooks = (): readonly Book[] => {
    const books: readonly Book[] = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.Javascript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.Javascript,
        },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.Javascript,
        },
    ] as const;
    return books;
};

const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    console.log(
        'First available',
        books.find(({ available }) => available),
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
const myID = createCustomerID('Ann', 10);

type myFn = typeof createCustomerID;

let idGenerator: myFn;
idGenerator = createCustomerID;

const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log('Name', name);
    if (age) {
        console.log('age', age);
    }
    if (city) {
        console.log('city', city);
    }
};

const getBookByID = (bookId: number): Book => {
    const allBooks = getAllBooks();
    return allBooks.find(({ id }) => id === bookId);
};

const checkoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
    console.log('Customer: ', customer);
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
        if (t === 'string') {
            return books.filter(({ author }) => author === arg);
        } else if (t === 'boolean') {
            return books.filter(({ available }) => available === arg);
        } else {
            return [];
        }
    } else if (args.length === 2) {
        const [idParam, availableParam] = args;
        if (typeof idParam === 'number' && typeof availableParam === 'boolean') {
            return books.filter(({ id, available }) => id === idParam && available === availableParam);
        } else {
            return [];
        }
    }
    return [];
}

function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

const bookTitleTransform = (title: any) => {
    assertStringValue(title);
    // return [...title].reverse().join('');
    return title.split('').reverse().join('');
};

console.log('createCustomerID(Ann, 10)', myID);
console.log('idGenerator(John, 22)', idGenerator('John', 22));
createCustomer('Ann');
createCustomer('Ann', 22);
createCustomer('Ann', 22, 'Paris');
getBookTitlesByCategory();
logFirstAvailable();
getBookByID(1);

const myBooks = checkoutBooks('Ann', 1, 4);
console.log('myBooks', myBooks);
console.log('getTitles(Liang Yuxian Eugene)', getTitles('Liang Yuxian Eugene'));
console.log('getTitles(false)', getTitles(true));
console.log('getTitles(2, true)', getTitles(2, true));
console.log('getTitles(3, true)', getTitles(3, true));

const checkedOutBooks = getTitles(false);
console.log('checkerOutBooks', checkedOutBooks);

console.log(bookTitleTransform('Typescript'));
console.log(bookTitleTransform(100));
