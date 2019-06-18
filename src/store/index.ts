import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { Container } from 'inversify';

import { reducers } from './modules';

export interface SagaContext {
    container: Container;
}

export function configureStore(container: Container): Store<any, any> & { saga: SagaMiddleware<SagaContext> } {
    const sagaMiddleware = createSagaMiddleware<SagaContext>({
        context: {
            container,
        },
        onError(err) {
            console.error(err);
        },
    });

    const middleware = [
        sagaMiddleware,
    ];

    const store: any =  createStore(
        combineReducers(reducers),
        composeWithDevTools({
            name: 'call-terminal',
            trace: true,
        })(
            applyMiddleware(...middleware),
        )
    );

    store.saga = sagaMiddleware;

    return store;
}
