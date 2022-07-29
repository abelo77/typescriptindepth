import { Category } from './enums';
import { Nullable } from './types';

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

interface Lib {
    lib: string;
    books: number;
    avgPagesPerBook: number;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
    // publisher?: string;
    // id?: number;
    // available?: boolean;
    // category?: Category;
}

interface LibMgrCallback {
    (err: Nullable<Error>, titles: Nullable<string[]>): void;
}

interface Callback<T> {
    (err: Nullable<Error>, data: Nullable<T>): void;
}

export {
    Author,
    Book,
    TOptions,
    Person,
    Librarian,
    DamageLogger as Logger,
    Lib,
    Magazine,
    ShelfItem,
    LibMgrCallback,
    Callback,
};
