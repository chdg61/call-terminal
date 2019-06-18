import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { IOperatorModel, OperatorModel } from '../../models/OperatorModel';
import { RefillBalanceFormValues } from '../../shared/refill-balance';


import { HTTP } from '../http';
import { IHttpClient } from '../http/types';
import { ILoadListOperatorsResponse, ILoadDetailOperatorResponse } from './responses';
import { IOperators } from './types';


@injectable()
export class Operators implements IOperators {

    @inject(HTTP)
    private readonly http!: IHttpClient;


    constructor() {
        this.loadListOperators = this.loadListOperators.bind(this);
        this.loadDetailOperator = this.loadDetailOperator.bind(this);
        this.refillBalanceForOperator = this.refillBalanceForOperator.bind(this);
    }

    public async loadListOperators(): Promise<IOperatorModel[]> {
        const response: ILoadListOperatorsResponse[] = await this.http.get<ILoadListOperatorsResponse[]>('/api/operators');

        if (Array.isArray(response)) {
            return response.map((item: ILoadListOperatorsResponse) => {
                return plainToClass(OperatorModel, item, {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true,
                });
            });
        }
        return [];
    }

    public async loadDetailOperator(operatorSlug: string): Promise<IOperatorModel> {
        const response: ILoadDetailOperatorResponse = await this.http.get<ILoadDetailOperatorResponse>('/api/operator/' + operatorSlug);

        return plainToClass(OperatorModel, response, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
    }

    public async refillBalanceForOperator(values: RefillBalanceFormValues): Promise<any> {
        return this.http.post('/api/refill/', {
            operator: values.operatorSlug,
            amount: values.amount,
            phone: values.phone,
        });
    }
}
