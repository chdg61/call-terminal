import { injectable } from 'inversify';
import { FetchHttpResponse } from './fetch-http-response';
import { IHttpAdapter, IHttpRequest, IHttpResponse } from './types';


@injectable()
export class FetchAdapter implements IHttpAdapter {

    public async handle<T, R = any>(request: IHttpRequest<R>): Promise<IHttpResponse<T>> {

        let url = request.url;

        const options: RequestInit = {
            headers: new Headers(),
            method: request.method,
            mode: 'cors',
        };

        if (request.withCredentials) {
            options.credentials = 'include';
        }

        if (request.headers) {
            Object.keys(request.headers).forEach((key: string) => {
                (options.headers as Headers).append(key, request.headers![key]);
            });
        }

        if (request.body) {
            options.body = request.body as any;
        }

        if (request.params) {
            const query = new URLSearchParams();

            Object.keys(request.params).forEach((key: string) => {
                query.append(key, request.params![key]);
            });

            const urlСomposite = new URL(request.url);
            urlСomposite.search = String(query);
            url = urlСomposite.toString();
        }

        const response = await fetch(url, options);
        return new FetchHttpResponse(response);
    }
}
