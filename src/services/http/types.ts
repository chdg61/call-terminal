export const HTTP = Symbol.for('http');
export const HTTP_BASE_URL = Symbol.for('http-base-url');
export const HTTP_ADAPTER = Symbol.for('http-adapter');


export type HttpOptions<R> = Omit<IHttpRequest<R>, 'url' | 'method' | 'body'>;

export interface IHttpClient {
    get<T = any, R = any>(url: string, options?: HttpOptions<R>): Promise<T>;
    post<T = any, R = any>(url: string, body: R, options?: HttpOptions<R>): Promise<T>;
    put<T = any, R = any>(url: string, body: R, options?: HttpOptions<R>): Promise<T>;
    delete<T = any, R = any>(url: string, options?: HttpOptions<R>): Promise<T>;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IHttpRequest<T> {
    url: string;
    method: Method;
    headers?: {[key: string]: string};
    params?: {[key: string]: string};
    withCredentials?: boolean;
    body?: T;
}

export interface IHttpResponse<T> {
    success: boolean;
    status: number;
    url: string;

    getHeaders(): {[key: string]: string};
    rawBody(): Promise<any>;
    json(): Promise<T>;
    text(): Promise<string>;
    getOriginal(): any;
}

export interface IHttpAdapter {
    handle<T, R = any>(request: IHttpRequest<R>): Promise<IHttpResponse<T>>;
}
