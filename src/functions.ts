/* eslint-disable no-redeclare */

import { Book, Callback, Lib } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined, Nullable } from './types';
import RefBook from './classes/encyclopedia';

export const getAllBooks = (): readonly Book[] => {
    return [
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
};

export const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    console.log(
        'First available',
        books.find(({ available }) => available),
    );
};

export const getBookTitlesByCategory = (categoryForFilter: Category = Category.Javascript): string[] => {
    const books = getAllBooks();
    return books.filter(({ category }) => category === categoryForFilter).map(({ title }) => title);
};

export const logBookTitles = (titles: string[]): void => {
    titles.forEach(item => console.log(item));
};

export const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
    const book = getAllBooks()[index];
    return [book?.title, book?.author];
};

export const calcTotalPages = () => {
    const books: readonly Lib[] = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ] as const;

    return books
        .map(({ avgPagesPerBook, books }) => BigInt(avgPagesPerBook) * BigInt(books))
        .reduce((prev, current): bigint => {
            return prev + current;
        }, BigInt(0));
};

export const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log('Name', name);
    if (age) {
        console.log('age', age);
    }
    if (city) {
        console.log('city', city);
    }
};

export const getBookByID = (bookId: Book['id']): BookOrUndefined => {
    const allBooks = getAllBooks();
    return allBooks.find(({ id }) => id === bookId);
};

export const printBook = (book: Book): void => {
    console.log(`${book.title} by ${book.author}`);
};

export const checkoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
    console.log('Customer: ', customer);
    return bookIDs.map(id => {
        const book = getBookByID(id);
        return book?.title;
    });
};

export function getTitles(author: string): Book[];
export function getTitles(available: boolean): Book[];
export function getTitles(id: number, available: boolean): Book[];
export function getTitles(...args: any[]): Book[] {
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

export function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

export const bookTitleTransform = (title: any) => {
    assertStringValue(title);
    // return [...title].reverse().join('');
    return title.split('').reverse().join('');
};

function assertRefBookInstance(condition: any): asserts condition {
    if (!(condition instanceof RefBook)) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data);
    data.printItem();
}

export const purge = <T>(inventory: T[]): T[] => inventory.slice(2);

export const getObjectProperty = <TObject, TKey extends keyof TObject>(
    obj: TObject,
    key: TKey,
): TObject[TKey] | string => obj[key];

export function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T,
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export const getBooksByCategory = (category: Category, callback: Callback<string[]>): void => {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (!titles.length) {
                throw new Error('No books found');
            }
            callback(null, titles);
        } catch (e) {
            callback(e, null);
        }
    }, 2000);
};

export const logCategorySearch = <T>(err: Nullable<Error>, data: Nullable<T>) => {
    if (err) {
        console.log('Error', err.message);
    } else {
        console.log('Titles', data);
    }
};

export const getBooksByCategoryPromise = (category: Category): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (!titles.length) {
                reject('No books found');
                return;
            }
            resolve(titles);
        }, 2000);
    });
};

export const logSearchResults = async (category: Category) => {
    const data = await getBooksByCategoryPromise(category);
    console.log('Titles awaited', data);
};
