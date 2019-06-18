import { fork, all } from 'redux-saga/effects';
import { loaderSaga } from './loaderSaga';
import { operatorSaga } from './operatorSaga';
import { redirectSaga } from './redirectSaga';


export function* rootSaga() {
    yield all([
        fork(operatorSaga),
        fork(redirectSaga),
        fork(loaderSaga),
    ]);
}
