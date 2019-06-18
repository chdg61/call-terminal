export const REDIRECT = Symbol('redirect');
export const ALERT = Symbol('alert');

export interface IRedirect {
    redirectUrl(url: string): void;
}

export interface IAlert {
    success(message: string): void;
    error(message: string): void;
}
