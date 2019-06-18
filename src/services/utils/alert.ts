import AlertS from 'react-s-alert';
import { injectable } from 'inversify';
import { IAlert } from './types';


@injectable()
export class Alert implements IAlert {

    success(message: string): void {
        AlertS.success(message);

    }

    error(message: string): void {
        AlertS.error(message);
    }
}
