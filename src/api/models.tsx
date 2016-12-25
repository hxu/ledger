export interface IAccount {
    id: number;
    type: AccountType;
    name: string;
    currency: Currency;
    parent?: IAccount;
    tags: string[];
    transactions: ITransaction[];
}

export enum Currency {
    USD,
    GBP,
    SGD
}

export enum AccountType {
    ASSET,
    EXPENSE,
    LIABILITY,
    INCOME,
    EQUITY
}

export interface ITransaction {
    id: number;
    date: number;
    description: string;
    notes: string;
    credit: number;
    debit: number;
    currency: Currency;
    account: IAccount;
}

export interface ISplit {
    id: number;
    transactions: ITransaction[];
}