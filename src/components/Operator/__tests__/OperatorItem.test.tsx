import * as React from 'react';
import { shallow } from 'enzyme';
import { OperatorModel } from '../../../models/OperatorModel';
import { OperatorItem } from '../OperatorItem';

jest.mock('react-router-dom', () => ({
    Link: (props) => (
        <a href="#">{props.children}</a>
    ),
}));



describe('OperatorItem', () => {

    it('success operator', () => {
        const operator = new OperatorModel()
        operator.id = 1;
        operator.slug = 'test';
        operator.name = 'Test name';
        const wrapper = shallow(
            <OperatorItem operator={operator} />
        );
        const instance = wrapper.instance();

        expect(wrapper.find('strong.text-gray-dark').text()).toBe('Test name');
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('Link').props()).toEqual({
            to: '/refill/test',
            children: 'Пополнить'
        });
    });
});
