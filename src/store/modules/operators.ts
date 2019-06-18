import { OperatorModel } from '../../models/OperatorModel';
import { RefillBalanceFormValues } from '../../shared/refill-balance';


export const OPERATORS_LIST_REQUEST = 'OPERATORS_LIST_REQUEST';
export const OPERATORS_LIST_SUCCESS = 'OPERATORS_LIST_SUCCESS';
export const OPERATORS_LIST_FAIL = 'OPERATORS_LIST_FAIL';

export const OPERATORS_DETAIL_REQUEST = 'OPERATORS_DETAIL_REQUEST';
export const OPERATORS_DETAIL_SUCCESS = 'OPERATORS_DETAIL_SUCCESS';
export const OPERATORS_DETAIL_FAIL = 'OPERATORS_DETAIL_FAIL';

export const OPERATORS_REFILL_BALANCE_REQUEST = 'OPERATORS_REFILL_BALANCE_REQUEST';
export const OPERATORS_REFILL_BALANCE_SUCCESS = 'OPERATORS_REFILL_BALANCE_SUCCESS';
export const OPERATORS_REFILL_BALANCE_FAIL = 'OPERATORS_REFILL_BALANCE_FAIL';



export interface OperatorsState {
    operatorList: OperatorModel[];
    operatorDetail: OperatorModel | null;
}

const initialState: OperatorsState = {
    operatorList: [],
    operatorDetail: null,
};

export function operators(state = initialState, action: OperatorsActions): OperatorsState {
    switch (action.type) {
        case OPERATORS_LIST_REQUEST: {
            return {
                ...state,
                operatorList: [],
            };
        }

        case OPERATORS_LIST_SUCCESS: {
            return {
                ...state,
                operatorList: action.payload,
            };
        }

        case OPERATORS_LIST_FAIL: {
            return {
                ...state,
                operatorList: [],
            };
        }

        case OPERATORS_DETAIL_REQUEST: {
            return {
                ...state,
                operatorDetail: null,
            };
        }

        case OPERATORS_DETAIL_SUCCESS: {
            return {
                ...state,
                operatorDetail: action.payload,
            };
        }

        case OPERATORS_DETAIL_FAIL: {
            return {
                ...state,
                operatorDetail: null,
            };
        }

        default: {
            return state;
        }
    }
}




export interface OperatorListLoadRequestAction {
    type: typeof OPERATORS_LIST_REQUEST;
}

export interface OperatorListLoadSuccessAction {
    type: typeof OPERATORS_LIST_SUCCESS;
    payload: OperatorModel[];
}

export interface OperatorListLoadFailAction {
    type: typeof OPERATORS_LIST_FAIL;
}

export function operatorListLoad(): OperatorListLoadRequestAction {
    return {
        type: OPERATORS_LIST_REQUEST,
    };
}

export function operatorListSuccess(operators: OperatorModel[]): OperatorListLoadSuccessAction {
    return {
        type: OPERATORS_LIST_SUCCESS,
        payload: operators,
    };
}

export function operatorListFail(): OperatorListLoadFailAction {
    return {
        type: OPERATORS_LIST_FAIL,
    };
}

export interface OperatorDetailLoadRequestAction {
    type: typeof OPERATORS_DETAIL_REQUEST;
    payload: string;
}

export interface OperatorDetailLoadSuccessAction {
    type: typeof OPERATORS_DETAIL_SUCCESS,
    payload: OperatorModel,
}

export interface OperatorDetailLoadFailAction {
    type: typeof OPERATORS_DETAIL_FAIL,
}


export function operatorDetailLoad(operatorSlug: string): OperatorDetailLoadRequestAction {
    return {
        type: OPERATORS_DETAIL_REQUEST,
        payload: operatorSlug,
    }
}

export function operatorDetailSuccess(operator: OperatorModel): OperatorDetailLoadSuccessAction {
    return {
        type: OPERATORS_DETAIL_SUCCESS,
        payload: operator
    }
}

export function operatorDetailFail(): OperatorDetailLoadFailAction {
    return {
        type: OPERATORS_DETAIL_FAIL,
    }
}


export interface OperatorRefillBalanceRequestAction {
    type: typeof OPERATORS_REFILL_BALANCE_REQUEST;
    payload: RefillBalanceFormValues;
}

export interface OperatorRefillBalanceSuccessAction {
    type: typeof OPERATORS_REFILL_BALANCE_SUCCESS,
}

export interface OperatorRefillBalanceFailAction {
    type: typeof OPERATORS_REFILL_BALANCE_FAIL,
}


export function refillBalance(values: RefillBalanceFormValues): OperatorRefillBalanceRequestAction {
    return {
        type: OPERATORS_REFILL_BALANCE_REQUEST,
        payload: values,
    }
}

export function refillBalanceSuccess(): OperatorRefillBalanceSuccessAction {
    return {
        type: OPERATORS_REFILL_BALANCE_SUCCESS,
    }
}

export function refillBalanceFail(): OperatorRefillBalanceFailAction {
    return {
        type: OPERATORS_REFILL_BALANCE_FAIL,
    }
}


export type OperatorsActions = OperatorListLoadRequestAction
    | OperatorListLoadSuccessAction
    | OperatorListLoadFailAction
    | OperatorDetailLoadRequestAction
    | OperatorDetailLoadSuccessAction
    | OperatorDetailLoadFailAction;
