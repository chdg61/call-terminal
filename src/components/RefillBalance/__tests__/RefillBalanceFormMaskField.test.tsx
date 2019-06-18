import { mount, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import MaskedInput from 'react-text-mask';
import { RefillBalanceFormMaskField } from '../RefillBalanceFormMaskField';


describe('RefillBalanceFormMaskField', () => {
    let component: ShallowWrapper<RefillBalanceFormMaskField>;
    let onBlur: any;
    let onChange: any;

    let createComponent = (value: string, error: string, touched: boolean) => {
        return (
            <RefillBalanceFormMaskField
                mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                label="Номер телефона"
                name="phone-test"
                placeholder="Введите номер телефона"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={error}
                touched={touched}
            />
        );
    }

    beforeEach(() => {
        onBlur = jest.fn();
        onChange = jest.fn();
        component = shallow(createComponent('', '', false));
    })

    it('default render', () => {
        expect(component).toBeDefined();
        expect(component.html()).toMatchSnapshot();
    });

    it('change value with reformat by mask - success', (done) => {
        const component = mount(createComponent('1234567890', '', false));
        setImmediate(() => {
            component.update();
            expect(component.find(MaskedInput).find('input').instance().value).toBe('+7 (123) 456-7890');
            expect(onChange).not.toBeCalled();
            expect(component.find('.invalid-feedback').length).toBe(0);
            done();
        })
    });

    it('change value with reformat by mask - part value', (done) => {
        const component = mount(createComponent('12345', '', false));
        setImmediate(() => {
            component.update();
            expect(component.find(MaskedInput).find('input').instance().value).toBe('+7 (123) 45_-____');
            expect(onChange).not.toBeCalled();
            expect(component.find('.invalid-feedback').length).toBe(0);
            done();
        })
    });

    it('onChange value', (done) => {
        const component = mount(createComponent('12345', '', false));
        const inputElement = component.find('input');
        inputElement.simulate('change', {
            persist: () => {},
            target: {
                name: 'inputElement',
                value: '+7 (123) 45_-____'
            }
        });
        setImmediate(() => {
            component.update();
            expect(onChange).toBeCalled();
            expect(onChange.mock.calls[0][0].target).toEqual({
                name: 'inputElement',
                value: '+7 (123) 45_-____'
            });
            done();
        })
    });

    it('onBlur value', (done) => {
        const component = mount(createComponent('12345', '', false));
        const inputElement = component.find('input');
        inputElement.simulate('blur');
        setImmediate(() => {
            component.update();
            expect(onBlur).toBeCalled();
            done();
        })
    });

    it('set error', (done) => {
        const component = mount(createComponent('12345', 'set error', false));
        const inputElement = component.find('input');
        setImmediate(() => {
            component.update();
            expect(component.find('.invalid-feedback').length).toBe(0);
            expect(component.find('input').hasClass('is-invalid')).toBeFalsy();
            done();
        })
    });

    it('set touch', (done) => {
        const component = mount(createComponent('12345', '', true));
        const inputElement = component.find('input');
        setImmediate(() => {
            component.update();
            expect(component.find('.invalid-feedback').length).toBe(0);
            expect(component.find('input').hasClass('is-invalid')).toBeFalsy();
            done();
        })
    });

    it('set touch and error', (done) => {
        const component = mount(createComponent('12345', 'set error', true));
        const inputElement = component.find('input');
        setImmediate(() => {
            component.update();
            expect(component.find('.invalid-feedback').text()).toBe('set error');
            expect(component.find('input').hasClass('is-invalid')).toBeTruthy();
            done();
        })
    });
});
