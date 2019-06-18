import { injectable } from 'inversify';
import { IHttpAdapter, IHttpRequest, IHttpResponse } from '../http/types';
import { ILoadListOperatorsResponse } from '../operators/responses';

export class MockHttpResponse<T> implements IHttpResponse<T>{

    status = 0;
    success = true;
    url = '';

    constructor(private data: any) {
    }


    getHeaders(): { [p: string]: string } {
        return {};
    }

    getOriginal(): any {
        return null;
    }

    json(): Promise<T> {
        return Promise.resolve(this.data);
    }

    rawBody(): Promise<any> {
        return Promise.resolve(this.data);
    }

    text(): Promise<string> {
        return Promise.resolve(this.data);
    }


}

@injectable()
export class MockAdapter implements IHttpAdapter {

    private operators: any = {
        'mts': {
            id: 1,
            slug: 'mts',
            name: 'МТС'
        },
        'beeline': {
            id: 2,
            slug: 'beeline',
            name: 'Билайн'
        },
        'megafon': {
            id: 3,
            slug: 'megafon',
            name: 'Мегафон'
        },
    };

    constructor(private originalHttpAdapter: IHttpAdapter){

    }

    public async handle<T, R = any>(request: IHttpRequest<R>): Promise<IHttpResponse<T>> {
        const url = new URL(request.url);
        switch (true) {
            case (url.pathname === '/api/operators' && request.method === 'GET'):
                return this.loadOperators(request) as any;
            case (/^\/api\/operator\/(.+)/i.test(url.pathname) && request.method === 'GET'):
                const match = url.pathname.match(/^\/api\/operator\/(.+)/i);
                return this.loadOneOperator(request, match![1]) as any;
            case url.pathname === '/api/refill/' && request.method === 'POST':
                return this.refillOperator(request) as any;
        }

        return this.originalHttpAdapter.handle(request);
    }

    private loadOperators(request: IHttpRequest<any>){
        const data: ILoadListOperatorsResponse[] = Object.values(this.operators);
        const responseMock = new MockHttpResponse<any>(data);
        responseMock.status = 200;
        responseMock.success = true;
        responseMock.url = request.url;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(responseMock);
            }, 500);
        });
    }

    private loadOneOperator(request: IHttpRequest<any>, slug: string){
        if (slug in this.operators) {
            const responseMock = new MockHttpResponse<any>(this.operators[slug]);
            responseMock.status = 200;
            responseMock.success = true;
            responseMock.url = request.url;

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(responseMock);
                }, 500);
            });
        }else {
            const responseMock = new MockHttpResponse<any>({
                errorMessage: `Оператор ${slug} не найден`
            });
            responseMock.status = 404;
            responseMock.success = false;
            responseMock.url = request.url;

            return responseMock;
        }
    }

    private refillOperator(request: IHttpRequest<any>){
        const luck = Math.floor(Math.random() * 2);
        if (luck === 1) {
            const responseMock = new MockHttpResponse<any>(null);
            responseMock.status = 200;
            responseMock.success = true;
            responseMock.url = request.url;

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(responseMock);
                }, 500);
            });
        }

        const responseMock = new MockHttpResponse<any>({
            errorMessage: 'Ошибка сервера',
        });
        responseMock.status = 403;
        responseMock.success = false;
        responseMock.url = request.url;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(responseMock);
            }, 500);
        });
    }
}
