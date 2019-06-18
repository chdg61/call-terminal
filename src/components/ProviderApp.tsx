import { interfaces } from 'inversify';
import React from 'react';

import { Provider } from 'react-redux';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import container from '../services';
import { Redirect, REDIRECT } from '../services/utils';
import { IRedirect } from '../services/utils/types';

import { configureStore } from '../store';
import { rootSaga } from '../store/sagas/rootSaga';

interface Props {
}

interface AllProps extends Props, RouteComponentProps {
}

class ProviderApp extends React.Component<AllProps> {
    private readonly store: any;

    constructor(props: AllProps) {
        super(props);

        container
            .bind<IRedirect>(REDIRECT)
            .toDynamicValue((context: interfaces.Context) => new Redirect(this.props.history));

        this.store = configureStore(container);

        this.store.saga.run(rootSaga);
    }

    public render(): React.ReactNode {
        return (
            <Provider store={this.store}>
                {this.props.children}
            </Provider>
        );
    }
}

export const ProviderAppWithRouter = withRouter(ProviderApp);
