import * as Interfaces from '../interfaces';

class UniversityLibrarian implements Interfaces.Librarian {
    name: string;
    department: string;
    email: string;

    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }
}

export { UniversityLibrarian };
