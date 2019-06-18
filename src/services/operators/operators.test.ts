import { OperatorModel } from '../../models/OperatorModel';
import { Operators } from './operators';
import { IOperators } from './types';

jest.mock('inversify', () => ({
    injectable: () => Component  => null,
    inject: () => Component  => null,
}));

describe('Api operators', () => {

    let service: IOperators | any;
    let getMock: Function;

    beforeEach(async () => {
        getMock = jest.fn();
        service = new Operators();
        service.http = {
            get: getMock
        }
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    describe('loadListOperators', () => {
        it('loadListOperators success', () => {
            service.http.get = jest.fn(() => {
                return [
                    {
                        id: 1,
                        name: 'operator1',
                        slug: 'oper1',
                    },
                    {
                        id: 2,
                        name: 'operator2',
                        slug: 'oper2',
                    },
                ]
            });
            return service.loadListOperators()
                .then((result) => {
                    expect(result).toEqual(jasmine.any(Array));
                    expect(result.length).toBe(2);
                    expect(result[0]).toEqual(jasmine.any(OperatorModel));
                    expect(result[0].id).toEqual(1);
                    expect(result[0].name).toEqual('operator1');
                    expect(result[0].slug).toEqual('oper1');
                    expect(service.http.get).toBeCalled();
                });
        });

        it('loadListOperators fail', () => {
            service.http.get = jest.fn(() => {
                return {};
            });
            return service.loadListOperators()
                .then((result) => {
                    expect(result).toEqual(jasmine.any(Array));
                    expect(result.length).toBe(0);
                    expect(service.http.get).toBeCalled();
                });
        });
    });


    describe('loadDetailOperator', () => {
        it('loadDetailOperator success', () => {
            service.http.get = jest.fn(() => {
                return {
                    id: 1,
                    name: 'operator1',
                    slug: 'oper1',
                };
            });
            return service.loadDetailOperator('slug')
                .then((result) => {
                    expect(result).toEqual(jasmine.any(OperatorModel));
                    expect(result.id).toEqual(1);
                    expect(result.name).toEqual('operator1');
                    expect(result.slug).toEqual('oper1');
                    expect(service.http.get).toBeCalledWith('/api/operator/slug');
                });
        });

        it('loadDetailOperator fail', () => {
            service.http.get = jest.fn(() => {
                return null;
            });
            return service.loadDetailOperator('slug')
                .then((result) => {
                    expect(result).toBeNull();
                });
        });
    });

    describe('refillBalanceForOperator', () => {
        it('refillBalanceForOperator body', () => {
            service.http.post = jest.fn(() => {
                return true;
            });
            return service.refillBalanceForOperator({
                amount: 1000,
                phone: '+7 (123) 546-4543',
                operatorSlug: 'mts'
            })
                .then(() => {
                    expect(service.http.post).toBeCalledWith('/api/refill/',{
                        amount: 1000,
                        phone: '+7 (123) 546-4543',
                        operator: 'mts'
                    });
                });
        });
    });
});
