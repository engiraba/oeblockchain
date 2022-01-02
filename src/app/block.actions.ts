import { Action } from "@ngrx/store";

export const GET_BLOCKHASH = '[Block] Hash';
export const GET_PREVIOUSHASH = '[Block] PreviousHash';
export const GET_TRANSACTIONS = '[Block] Transactions';
export const GET_NEWBLOCK = '[Block] NewBlock';
export const RESET_CHAIN = '[Block] ResetChain';
export const UPDATE_STATUS = '[Block] UpdateStatus';

export class GetBlockHash implements Action {
    readonly type = GET_BLOCKHASH;
}

export class GetPrevioushash implements Action {
    readonly type = GET_PREVIOUSHASH;
}

export class GetTransactions implements Action {
    readonly type = GET_TRANSACTIONS;
}

export class GetNewBlock implements Action {
    readonly type = GET_NEWBLOCK;
    constructor(public payload?: any) {}
}

export class UpdateStatus implements Action {
    readonly type = UPDATE_STATUS;
    constructor(public payload?: any) {}
}

export class ResetChain implements Action {
    readonly type = RESET_CHAIN;
}

export type All 
    = GetBlockHash
    | GetPrevioushash
    | GetTransactions
    | GetNewBlock
    | UpdateStatus
    | ResetChain;