import {shallow} from 'enzyme';
import * as React from 'react';
import {Main} from "../Main";
import {OperatorItem} from "../../components/Operator";


describe('Main', () => {

    it('empty list operators', () => {
        const loadOperators = jest.fn();
        const wrapper = shallow(
            <Main
                operators={[]}
                loadOperators={loadOperators}
            />
        );
        expect(loadOperators).toBeCalled();
        expect(wrapper.find(OperatorItem).length).toBe(0);
    });

    it('fill list operators', () => {
        const loadOperators = jest.fn();
        const wrapper = shallow(
            <Main
                operators={[
                    {
                        id: 1,
                        slug: 'mts',
                        name: 'mts',
                    },
                    {
                        id: 2,
                        slug: 'beeline',
                        name: 'beeline',
                    }
                ]}
                loadOperators={loadOperators}
            />
        );
        expect(loadOperators).toBeCalled();
        expect(wrapper.find(OperatorItem).length).toBe(2);
        expect(wrapper.find(OperatorItem).at(0).props().operator).toEqual({
            id: 1,
            slug: 'mts',
            name: 'mts',
        });
        expect(wrapper.find(OperatorItem).at(1).props().operator).toEqual({
            id: 2,
            slug: 'beeline',
            name: 'beeline',
        });
    });


});
