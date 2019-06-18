import { Container, interfaces } from 'inversify';
import { HTTP, HTTP_ADAPTER, HTTP_BASE_URL, HttpClient } from './http';
import { FetchAdapter } from './http/fetch-adapter';
import { IHttpClient, IHttpAdapter } from './http/types';
import { MockAdapter } from './mock/mock-adapter';

import { Operators, OPERATORS } from './operators';
import { IOperators } from './operators/types';
import { Alert } from './utils/alert';
import { ALERT, IAlert } from './utils/types';

const container = new Container();

container.bind<IHttpClient>(HTTP).to(HttpClient);
container.bind<IHttpAdapter>(HTTP_ADAPTER)
    .toDynamicValue((context: interfaces.Context) => {
        const fetchAdapter = new FetchAdapter();
        if (process.env.REACT_APP_USE_MOCK) {
            return new MockAdapter(fetchAdapter);
        }

        return fetchAdapter;
    });
container.bind<string>(HTTP_BASE_URL).toConstantValue(process.env.REACT_APP_BASE_URL as string);
container.bind<IOperators>(OPERATORS).to(Operators);

container.bind<IAlert>(ALERT).to(Alert);

export default container;
