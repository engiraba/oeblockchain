import { Block } from './block.model';
import * as BlockActions from './block.actions';

export type Action = BlockActions.All;

const defaultState: any = {
    blockchain: [],
    previoushash: {},
    blockhash: '',
    transactions: [],
    status: {}
};

const newState = (state: any, newData: any) => {
    return Object.assign({}, state, newData)
}

export function blockReducer(state = defaultState, action: any) {
    console.log(action.type, state);
    switch (action.type) {
        case BlockActions.GET_BLOCKHASH:
            return newState(state, {blockhash: state.block[0].getBlockHash()})            
        case BlockActions.GET_PREVIOUSHASH:
            return newState(state, {previoushash: state.block[0].getPreviousHash()})
        case BlockActions.GET_TRANSACTIONS:
            return newState(state, {transactions: state.block[0].getTransactions()})
        case BlockActions.UPDATE_STATUS:
            return newState(state, {status: action.payload})
        case BlockActions.GET_NEWBLOCK:    
            return newState(state, {
                blockchain: [
                    action.payload
                    ,
                    ...state.blockchain                    
                ],
                blockhash: action.payload.blockHash,
                previoushash: action.payload.previousHash,
                transactions: action.payload.transactions
            });
        case BlockActions.RESET_CHAIN:
            return defaultState
        default:
            return state;
    }

  
}