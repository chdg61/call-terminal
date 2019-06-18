import { History } from 'history';
import { injectable } from 'inversify';
import { IRedirect } from './types';


@injectable()
export class Redirect implements IRedirect {

    constructor(private history: History) {
        this.redirectUrl = this.redirectUrl.bind(this);
    }

    redirectUrl(url: string): void {
        this.history.push(url);
    }
}
