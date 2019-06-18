import { Expose } from 'class-transformer';

export interface IOperatorModel {
    id: number;
    slug: string;
    name: string;
}

export class OperatorModel implements IOperatorModel {

    @Expose()
    public id: number = 0;

    @Expose()
    public slug: string = '';

    @Expose()
    public name: string = '';
}
