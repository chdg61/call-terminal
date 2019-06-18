import {shallow} from 'enzyme';
import * as React from 'react';
import {RefillBalanceFormWrapper} from '../../components/RefillBalance';
import {RefillBalance} from '../RefillBalance';


describe('RefillBalance', () => {

    it('defined form', () => {
        const loadOperator = jest.fn();
        const component = shallow(
            <RefillBalance
                history={{}}
                loadOperator={loadOperator}
                operator={{
                    id: 1,
                    slug: 'mts',
                    name: 'mts',
                }}
                match={{
                    params: {
                        slug: 'mts'
                    }
                }}
            />
        );
        expect(loadOperator).toBeCalledWith('mts');
        expect(component.find('h6').text()).toBe('Оператор mts');
    });

    it('submit form', () => {
        const loadOperator = jest.fn();
        const refillBalance = jest.fn();
        const component = shallow(
            <RefillBalance
                history={{}}
                loadOperator={loadOperator}
                refillBalance={refillBalance}
                operator={{
                    id: 1,
                    slug: 'mts',
                    name: 'mts',
                }}
                match={{
                    params: {
                        slug: 'mts'
                    }
                }}
            />
        );
        component.find(RefillBalanceFormWrapper).props().onSubmit({
            phone: '+7 (123) 123-1234',
            amount: 1000,
        });
        expect(refillBalance).toBeCalledWith({
            phone: '+7 (123) 123-1234',
            amount: 1000,
            operatorSlug: 'mts',
        });
    });

    it('empty operator detail', () => {
        const loadOperator = jest.fn();
        const refillBalance = jest.fn();
        const component = shallow(
            <RefillBalance
                history={{}}
                loadOperator={loadOperator}
                refillBalance={refillBalance}
                operator={null}
                match={{
                    params: {}
                }}
            />
        );
        expect(component.find('h6').text()).toBe('Оператор ');
        expect(loadOperator).toBeCalledWith(undefined);
        component.find(RefillBalanceFormWrapper).props().onSubmit({
            phone: '+7 (123) 123-1234',
            amount: 1000,
        });
        expect(refillBalance).not.toBeCalled();
    });
});
