import AccountType from '../enums/AccountType.enum';

export type LibraryUser = {
  email: string | null,
  emailVerified?: boolean,
  documentID?: string,
  accountType: AccountType,
  uid: string,
};
