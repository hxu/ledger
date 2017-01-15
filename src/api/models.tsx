export interface IBoolMap {
    [k: string]: boolean
}

export interface IAccount {
    id: string;
    type: AccountType;
    name: string;
    currency: ICurrency;
    parent?: string;
    tags: IBoolMap;
    splits: IBoolMap;
}

export interface IAccountCreateRequest {
    type: AccountType;
    name: string;
    currency: ICurrency;
    parent?: string;
    tags?: IBoolMap;
}

export interface ICurrency {
    code: string;
}

export enum AccountType {
    ASSET = 1,
    EXPENSE = 2,
    LIABILITY = 3,
    INCOME = 4,
    EQUITY = 5
}

export interface ISplit {
    id: string;
    date: number;
    description: string;
    notes?: string;
    credit: number;
    debit: number;
    currency: string;
    account: string;
    transaction: string;
}

export interface ITransaction {
    id: string;
    splits: IBoolMap;
}