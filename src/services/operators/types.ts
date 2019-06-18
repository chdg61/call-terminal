import { IOperatorModel } from '../../models/OperatorModel';
import { RefillBalanceFormValues } from '../../shared/refill-balance';

export const OPERATORS = Symbol('operators');

export interface IOperators {
    loadListOperators(): Promise<IOperatorModel[]>;
    loadDetailOperator(operatorSlug: string): Promise<IOperatorModel>;
    refillBalanceForOperator(values: RefillBalanceFormValues): Promise<any>;
}
