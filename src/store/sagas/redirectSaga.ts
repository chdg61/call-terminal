import { Container } from 'inversify';
import { all, getContext, takeLatest } from 'redux-saga/effects';
import { REDIRECT } from '../../services/utils';
import { IRedirect } from '../../services/utils/types';
import { APPLICATION_REDIRECT, ApplicationRedirectAction } from '../modules/application';

export function* redirectPush(action: ApplicationRedirectAction) {
    const container: Container = yield getContext('container');
    const redirect: IRedirect = yield container.get(REDIRECT);
    redirect.redirectUrl(action.payload);
}


export function* redirectSaga() {
    yield all([
        takeLatest(APPLICATION_REDIRECT, redirectPush),
    ]);
}
