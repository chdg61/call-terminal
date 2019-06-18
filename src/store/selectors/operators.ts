import { RootReducer } from '../modules';

export const selectOperatorList = (state: RootReducer) => state.operators.operatorList || [];

export const selectOperatorDetail = (state: RootReducer) => state.operators.operatorDetail || null;
