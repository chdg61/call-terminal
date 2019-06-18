import { operators, OperatorsState } from './operators';
import { application, ApplicationState } from './application';

export interface RootReducer {
    operators: OperatorsState;
    application: ApplicationState;
}

export const reducers: { [K in keyof RootReducer]: any } = {
    operators,
    application,
};
