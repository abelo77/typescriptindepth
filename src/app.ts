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

interface Lib {
    lib: string;
    books: number;
    avgPagesPerBook: number;
}

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

const logFirstAvailable = (books: readonly Book[]): void => {
    console.log(
        'First available',
        books.find(({ available }) => available),
    );
};

const getBookTitlesByCategory = (categoryForFilter: Category): string[] => {
    const books = getAllBooks();
    return books.filter(({ category }) => category === categoryForFilter).map(({ title }) => title);
};

const logBookTitles = (titles: string[]): void => {
    titles.forEach(item => console.log(item));
};

const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
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

logFirstAvailable(getAllBooks());
console.log('Javascript books:');
logBookTitles(getBookTitlesByCategory(Category.Javascript));
console.log('CSS books:');
logBookTitles(getBookTitlesByCategory(Category.CSS));

console.log('getBookAuthorByIndex 1', getBookAuthorByIndex(1));
console.log('calcTotalPages', calcTotalPages());
