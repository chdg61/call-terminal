import { IHttpResponse } from './types';


export class FetchHttpResponse<T> implements IHttpResponse<T>{

    constructor(private response: Response){
    }

    get status(): number {
        return this.response.status;
    }

    get success(): boolean {
        return this.response.ok;
    }

    get url(): string {
        return this.response.url;
    }

    getHeaders(): { [p: string]: string } {
        return Array.from(this.response.headers.entries())
            .reduce<{ [p: string]: string }>((target: { [p: string]: string }, current: [string, string]) => {
                target[current[0]] = current[1];
                return target;
            }, {});
    }

    getOriginal(): any {
        return this.response;
    }

    json(): Promise<T> {
        return this.response.json();
    }

    rawBody(): Promise<any> {
        return Promise.resolve(this.response.body);
    }

    text(): Promise<string> {
        return this.response.text();
    }


}
