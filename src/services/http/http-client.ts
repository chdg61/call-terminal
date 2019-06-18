import { inject, injectable } from 'inversify';
import { HTTP_ADAPTER, HTTP_BASE_URL, HttpOptions, IHttpAdapter, IHttpClient, IHttpRequest } from './types';

@injectable()
export class HttpClient implements IHttpClient {

    @inject(HTTP_ADAPTER)
    private readonly adapter!: IHttpAdapter;

    @inject(HTTP_BASE_URL)
    private readonly baseUrl!: string;

    private async request<T, R = any>(options: IHttpRequest<R>): Promise<T> {
        options.url = new URL(options.url, this.baseUrl).toString();

        if (!options.headers) {
            options.headers = {
                'Content-Type': 'application/json'
            }
        }

        if (options.body) {
            options.body = JSON.stringify(options.body) as any;
        }

        const response = await this.adapter.handle<T, R>(options);

        if (!response.success) {
            // иначе не видно данных в Chrome DevTools
            await response.json();

            throw new Error('Ошибка сервера');
        }

        return await response.json();
    }

    public async get<T>(url: string, options: HttpOptions<any> = {}): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'GET',
            url,
        });
    }

    public async post<T = any, R = any>(url: string, body: R, options: HttpOptions<R> = {}): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'POST',
            url,
            body,
        });
    }

    public async put<T = any, R = any>(url: string, body: R, options: HttpOptions<R> = {}): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'PUT',
            url,
            body,
        });
    }

    public async delete<T = any>(url: string, options: HttpOptions<any> = {}): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'DELETE',
            url,
        });
    }
}
