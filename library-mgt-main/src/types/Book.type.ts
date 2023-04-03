import RequestStatus from '../enums/RequestStatus.enum';

export type Book = {
  accessionNumber: string;
  author: string;
  bookType: string;
  callNumber: string;
  id?: string;
  imageUrl: string;
  keywords: string;
  publisher: string;
  returnDate: string;
  status: string;
  title: string;
};

export type BookRequest = {
  id?: string;
  email: string;
  bookId: string;
  bookTitle: string;
  status: RequestStatus;
};
