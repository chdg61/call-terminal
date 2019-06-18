import { Container } from 'inversify';
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import { IOperators, OPERATORS } from '../../services/operators/types';
import { ALERT, IAlert } from '../../services/utils/types';
import { loaderHide, loaderShow, redirect } from '../modules/application';
import {
    OperatorDetailLoadRequestAction,
    operatorDetailSuccess,
    operatorListSuccess,
    OperatorRefillBalanceRequestAction,
    OPERATORS_DETAIL_REQUEST,
    OPERATORS_LIST_REQUEST, OPERATORS_REFILL_BALANCE_FAIL,
    OPERATORS_REFILL_BALANCE_REQUEST, OPERATORS_REFILL_BALANCE_SUCCESS, refillBalanceFail, refillBalanceSuccess,
} from '../modules/operators';

export function* loadOperatorList() {
    try {
        yield put(loaderShow());
        const container: Container = yield getContext('container');
        const operators: IOperators = yield container.get(OPERATORS);

        const response = yield call(operators.loadListOperators);

        yield put(operatorListSuccess(response));
    } catch (err) {
        console.error(err);
    } finally {
        yield put(loaderHide());
    }
}

export function* loadOperatorDetail(action: OperatorDetailLoadRequestAction) {
    try {
        yield put(loaderShow());
        const container: Container = yield getContext('container');
        const operators: IOperators = yield container.get(OPERATORS);

        const response = yield call(operators.loadDetailOperator, action.payload);

        yield put(operatorDetailSuccess(response));
    } catch (err) {
        console.error(err);
    } finally {
        yield put(loaderHide());
    }
}

export function* refillBalance(action: OperatorRefillBalanceRequestAction) {
    try {
        yield put(loaderShow());
        const container: Container = yield getContext('container');
        const operators: IOperators = yield container.get(OPERATORS);

        yield call(operators.refillBalanceForOperator, action.payload);

        yield put(refillBalanceSuccess());
    } catch (err) {
        console.error(err);
        yield put(refillBalanceFail());
    } finally {
        yield put(loaderHide());
    }
}

export function* refillBalanceSuccessSaga() {
    const container: Container = yield getContext('container');
    const alert: IAlert = yield container.get(ALERT);
    alert.success('Успешное пополнение');

    yield put(redirect('/'));
}

export function* refillBalanceFailSaga() {
    const container: Container = yield getContext('container');
    const alert: IAlert = yield container.get(ALERT);
    alert.error('Ошибка! Пополнить баланс не получилось.');
}

export function* operatorSaga() {
    yield all([
        takeLatest(OPERATORS_LIST_REQUEST, loadOperatorList),
        takeLatest(OPERATORS_DETAIL_REQUEST, loadOperatorDetail),
        takeLatest(OPERATORS_REFILL_BALANCE_REQUEST, refillBalance),
        takeLatest(OPERATORS_REFILL_BALANCE_SUCCESS, refillBalanceSuccessSaga),
        takeLatest(OPERATORS_REFILL_BALANCE_FAIL, refillBalanceFailSaga),
    ]);
}
