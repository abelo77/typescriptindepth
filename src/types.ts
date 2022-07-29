import { Author, Book, Person } from './interfaces';
import { createCustomer, getBooksByCategoryPromise } from './functions';

export type BookProperties = keyof Book;

export type BookOrUndefined = Book | undefined;

export type PersonBook = Person & Book;

export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type CreateCustomerFunctionType = typeof createCustomer;

export type fn = (p1: string, p2: number, p3: boolean) => symbol;
export type P1<T> = T extends (p1: infer U, p2: number, p3: boolean) => symbol ? U : never;
export type P2<T> = T extends (p1: string, p2: infer U, p3: boolean) => symbol ? U : never;
export type P3<T> = T extends (p1: string, p2: number, p3: infer U) => symbol ? U : never;

export type Param1 = P1<fn>;
export type Param2 = P2<fn>;
export type Param3 = P3<fn>;

export type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop;
}[keyof T];

export type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop : never;
}[keyof T];

export type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

type BookRequiredProps = RequiredProps<Book>;
type BookOptionalProps = OptionalProps<Book>;

type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

export type Nullable<T> = T | null;

export type Unpromisify<T> = T extends Promise<infer S> ? S : never;
export type RT = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>; //Awaited
