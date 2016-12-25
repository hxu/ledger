import {IAccount, ITransaction} from "./models";

class AccountService {
    accounts: {number: IAccount};

    create(): IAccount {
        return null;
    }

    remove(): void {
    }
}

class TransactionService {
    create(): ITransaction {
        return null;
    }

    remove(): void {
    }
}