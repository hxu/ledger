export interface IAccount {
    id: string;
    type: AccountType;
    name: string;
    currency: ICurrency;
    parent?: string;
    tags: string[];
    transactions: ITransaction[];
}

export interface IAccountCreateRequest {
    type: AccountType;
    name: string;
    currency: ICurrency;
    parent?: string;
    tags?: string[];
}

export interface ICurrency {
    code: string;
}

export enum AccountType {
    ASSET,
    EXPENSE,
    LIABILITY,
    INCOME,
    EQUITY
}

export interface ITransaction {
    id: string;
    date: number;
    description: string;
    notes: string;
    credit: number;
    debit: number;
    currency: ICurrency;
    account: IAccount;
}

export interface ISplit {
    id: string;
    transactions: ITransaction[];
}