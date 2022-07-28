import { Book, Person } from './interfaces';

export type BookProperties = keyof Book;

export type BookOrUndefined = Book | undefined;

export type PersonBook = Person & Book;
