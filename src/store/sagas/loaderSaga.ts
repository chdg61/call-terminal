import { all, put, throttle } from 'redux-saga/effects';
import {
    APPLICATION_LOADER_HIDE,
    APPLICATION_LOADER_HIDE_WITH_DELAY,
    APPLICATION_LOADER_SHOW,
    APPLICATION_LOADER_SHOW_WITH_DELAY,
} from '../modules/application';

function* showLoaderSaga() {
    yield put({
        type: APPLICATION_LOADER_SHOW,
    });
}

function* hideLoaderSaga() {
    yield put({
        type: APPLICATION_LOADER_HIDE,
    });
}

export function* loaderSaga() {
    yield all([
        throttle(300, APPLICATION_LOADER_SHOW_WITH_DELAY, showLoaderSaga),
        throttle(300, APPLICATION_LOADER_HIDE_WITH_DELAY, hideLoaderSaga),
    ]);
}
