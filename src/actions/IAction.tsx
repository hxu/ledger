import {Action} from "redux";

export interface IAction<P> extends Action {
    type: string;
    payload: P;
    error?: boolean;
    meta?: any;
}

export function isAction<P>(action: IAction<any>, type: string): action is IAction<P> {
    return action.type == type;
}

