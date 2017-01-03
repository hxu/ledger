
export interface IAction<P> {
    type: string;
    payload: P;
    error?: boolean;
    meta?: any;
}

export function isAction<P>(action: IAction<any>, type: string): action is IAction<P> {
    return action.type == type;
}

