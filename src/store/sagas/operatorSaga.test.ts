import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, getContext, put } from 'redux-saga/effects';
import { OPERATORS } from '../../services/operators';
import {loaderHide, loaderShow, redirect} from '../modules/application';
import {
    operatorDetailLoad,
    operatorDetailSuccess,
    operatorListSuccess,
    refillBalance, refillBalanceFail,
    refillBalanceSuccess
} from '../modules/operators';
import {
    loadOperatorList,
    loadOperatorDetail,
    refillBalance as refillBalanceSaga,
    refillBalanceSuccessSaga, refillBalanceFailSaga
} from './operatorSaga';
import {ALERT} from "../../services/utils/types";

describe('Test Operators Saga', () => {
    describe('loadOperatorList', () => {

        let loadListOperators: Function;
        let get: Function;
        const gen = cloneableGenerator(loadOperatorList)();

        beforeAll(() => {
            loadListOperators = jest.fn(() => {
                return {};
            });
            get = jest.fn(() => {
                return {
                    loadListOperators
                };
            });
        });

        it('show loader', () => {
            expect(gen.next().value).toEqual(put(loaderShow()));
        });

        it('get container', function () {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('api method', function () {
            expect(gen.next({get}).value).toEqual({loadListOperators});
            expect(get).toBeCalledWith(OPERATORS);
        });

        it('call api method', function () {
            expect(gen.next({loadListOperators}).value).toEqual(call(loadListOperators));
        });

        describe('success', () => {
            let clone;
            beforeAll(() => {
                clone = gen.clone();
            });

            it('success reduce', () => {
                expect(clone.next([]).value).toEqual(put(operatorListSuccess([])));
            });

            it('loader hide', () => {
                expect(clone.next().value).toEqual(put(loaderHide()));
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });

        describe('fail', () => {
            let clone;
            global.console.error = jest.fn();
            beforeAll(() => {
                clone = gen.clone();
            });

            it('loader hide', () => {
                const error = new Error('Server error');
                expect(clone.throw(error).value).toEqual(put(loaderHide()));
                expect(global.console.error).toBeCalledWith(error);
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });
    })

    describe('loadOperatorDetail', () => {

        let loadDetailOperator: Function;
        let get: Function;
        const gen = cloneableGenerator(loadOperatorDetail)(operatorDetailLoad('mts'));

        beforeAll(() => {
            loadDetailOperator = jest.fn(() => {
                return {};
            });
            get = jest.fn(() => {
                return {
                    loadDetailOperator
                };
            });
        });

        it('show loader', () => {
            expect(gen.next().value).toEqual(put(loaderShow()));
        });

        it('get container', function () {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('api method', function () {
            expect(gen.next({get}).value).toEqual({loadDetailOperator});
            expect(get).toBeCalledWith(OPERATORS);
        });

        it('call api method', function () {
            expect(gen.next({loadDetailOperator}).value).toEqual(call(loadDetailOperator, 'mts'));
        });

        describe('success', () => {
            let clone;
            beforeAll(() => {
                clone = gen.clone();
            });

            it('success reduce', () => {
                expect(clone.next({}).value).toEqual(put(operatorDetailSuccess({})));
            });

            it('loader hide', () => {
                expect(clone.next().value).toEqual(put(loaderHide()));
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });

        describe('fail', () => {
            let clone;
            global.console.error = jest.fn();
            beforeAll(() => {
                clone = gen.clone();
            });

            it('loader hide', () => {
                const error = new Error('Server error');
                expect(clone.throw(error).value).toEqual(put(loaderHide()));
                expect(global.console.error).toBeCalledWith(error);
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });
    });

    describe('refillBalance', () => {

        let refillBalanceForOperator: Function;
        let get: Function;
        const gen = cloneableGenerator(refillBalanceSaga)(refillBalance({
            amount: 1000,
            operatorSlug: 'mts',
            phone: '+7 (123) 456-6544',
        }));

        beforeAll(() => {
            refillBalanceForOperator = jest.fn(() => {
                return {};
            });
            get = jest.fn(() => {
                return {
                    refillBalanceForOperator
                };
            });
        });

        it('show loader', () => {
            expect(gen.next().value).toEqual(put(loaderShow()));
        });

        it('get container', function () {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('api method', function () {
            expect(gen.next({get}).value).toEqual({refillBalanceForOperator});
            expect(get).toBeCalledWith(OPERATORS);
        });

        it('call api method', function () {
            expect(gen.next({refillBalanceForOperator}).value).toEqual(call(refillBalanceForOperator, {
                amount: 1000,
                operatorSlug: 'mts',
                phone: '+7 (123) 456-6544',
            }));
        });

        describe('success', () => {
            let clone;
            beforeAll(() => {
                clone = gen.clone();
            });

            it('success reduce', () => {
                expect(clone.next().value).toEqual(put(refillBalanceSuccess()));
            });

            it('loader hide', () => {
                expect(clone.next().value).toEqual(put(loaderHide()));
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });

        describe('fail', () => {
            let clone;
            global.console.error = jest.fn();
            beforeAll(() => {
                clone = gen.clone();
            });

            it('loader hide', () => {
                const error = new Error('Server error');
                expect(clone.throw(error).value).toEqual(put(refillBalanceFail()));
                expect(global.console.error).toBeCalledWith(error);
            });

            it('loader hide', () => {
                expect(clone.next().value).toEqual(put(loaderHide()));
            });

            it('end', () => {
                expect(clone.next().done).toBeTruthy();
            });
        });
    });

    describe('refillBalanceSuccessSaga', () => {

        let success: Function;
        let get: Function;
        const gen = cloneableGenerator(refillBalanceSuccessSaga)();

        beforeAll(() => {
            success = jest.fn(() => {
                return {};
            });
            get = jest.fn(() => {
                return {
                    success
                };
            });
        });

        it('get container', function () {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('api method', function () {
            expect(gen.next({get}).value).toEqual({success});
            expect(get).toBeCalledWith(ALERT);
        });

        let redirectGen;
        it('alert success', function () {
            redirectGen = gen.next({success}).value;
            expect(success).toBeCalledWith('Успешное пополнение');
        });
        it('redirect', () => {
            expect(redirectGen).toEqual(put(redirect('/')));
        });

        it('end', () => {
            expect(gen.next().done).toBeTruthy();
        });
    });

    describe('refillBalanceFailSaga', () => {

        let error: Function;
        let get: Function;
        const gen = cloneableGenerator(refillBalanceFailSaga)();

        beforeAll(() => {
            error = jest.fn(() => {
                return {};
            });
            get = jest.fn(() => {
                return {
                    error
                };
            });
        });

        it('get container', function () {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('api method', function () {
            expect(gen.next({get}).value).toEqual({error});
            expect(get).toBeCalledWith(ALERT);
        });

        let errorGen;
        it('alert success', function () {
            errorGen = gen.next({error});
            expect(error).toBeCalledWith('Ошибка! Пополнить баланс не получилось.');
        });

        it('end', () => {
            expect(errorGen.done).toBeTruthy();
        });
    });
});
