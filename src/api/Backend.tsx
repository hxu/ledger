import {IAccount, IAccountCreateRequest} from "./models";


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


export default class Backend {
    static storeAccount(acct: IAccountCreateRequest): Promise<IAccount> {
        let promise: Promise<IAccount> = new Promise<IAccount>(
            function(resolve, reject) {
                let id = uuid();
                let newAccount: IAccount = Object.assign(
                    {tags: [], transactions: []},
                    acct,
                    {id: id}
                );
                console.log(newAccount);
                window.setTimeout(() => resolve(newAccount), 500);
            }
        );

        return promise;
    }
}