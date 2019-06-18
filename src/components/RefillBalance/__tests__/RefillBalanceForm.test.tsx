import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { RefillBalanceForm, RefillBalanceFormWrapper } from '../RefillBalanceForm';
import { RefillBalanceFormMaskField } from '../RefillBalanceFormMaskField';


describe('RefillBalanceFormWrapper', () => {

    it('empty form', () => {
        const onSubmit = jest.fn();
        const wrapper = shallow(
            <RefillBalanceFormWrapper onSubmit={onSubmit} />
        );
        const instance = wrapper.instance();

        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('validate phone', () => {
        it('validate change phone number - bad value', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0);
            formField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 55_-____'
                }
            });
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 55_-____'
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.phone).toBe('Телефон должен быть формата +7(912) 345-5566');
                expect(wrapper.find(RefillBalanceForm).props().touched.phone).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0).find('.invalid-feedback').length).toBe(1);
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0).find('.invalid-feedback').text()).toBe('Телефон должен быть формата +7(912) 345-5566');
                done();
            })
        });

        it('validate change phone number - good value', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );

            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0);
            formField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 556-7788'
                }
            });
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 556-7788'
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.phone).toBeUndefined();
                expect(wrapper.find(RefillBalanceForm).props().touched.phone).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0).find('.invalid-feedback').length).toBe(0);
                done();
            })
        });

        it('empty phone number', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0);
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: ''
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.phone).toBe('Поле обязательное для заполнения');
                expect(wrapper.find(RefillBalanceForm).props().touched.phone).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0).find('.invalid-feedback').length).toBe(1);
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0).find('.invalid-feedback').text()).toBe('Поле обязательное для заполнения');
                done();
            })
        });
    });

    describe('validate amount', () => {
        it('validate change amount - min amount', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1);
            formField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '0 Р'
                }
            });
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '0 Р'
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.amount).toBe('Минимальная сумма платежа - 1 рубль');
                expect(wrapper.find(RefillBalanceForm).props().touched.amount).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').length).toBe(1);
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').text()).toBe('Минимальная сумма платежа - 1 рубль');
                done();
            })
        });

        it('validate change amount - max amount', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1);
            formField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1001 Р'
                }
            });
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1001 Р'
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.amount).toBe('Максимальная сумма платежа - 1000 рублей');
                expect(wrapper.find(RefillBalanceForm).props().touched.amount).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').length).toBe(1);
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').text()).toBe('Максимальная сумма платежа - 1000 рублей');
                done();
            })
        });

        it('validate change amount - good value', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );

            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1);
            formField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1000 Р'
                }
            });
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1000 Р'
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.amount).toBeUndefined();
                expect(wrapper.find(RefillBalanceForm).props().touched.amount).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').length).toBe(0);
                done();
            })
        });

        it('empty amount', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const formField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1);
            formField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: ''
                }
            });
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().errors.amount).toBe('Поле обязательное для заполнения');
                expect(wrapper.find(RefillBalanceForm).props().touched.amount).toBeTruthy();
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').length).toBe(1);
                expect(wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1).find('.invalid-feedback').text()).toBe('Поле обязательное для заполнения');
                done();
            })
        });
    });

    describe('submit form', () => {
        it('not submit because not valid phone or amount', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );
            const form = wrapper.find(RefillBalanceForm).find('form');
            form.simulate("submit", );
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().isValid).toBeFalsy();
                expect(onSubmit).not.toBeCalled();
                done();
            })
        });

        it('submit with valid phone and amount', (done) => {
            const onSubmit = jest.fn();
            const wrapper = mount(
                <RefillBalanceFormWrapper onSubmit={onSubmit} />
            );

            const phoneField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(0);
            phoneField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 556-7788'
                }
            });
            phoneField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'phone',
                    value: '+7 (123) 556-7788'
                }
            });


            const amountField = wrapper.find(RefillBalanceForm).find(RefillBalanceFormMaskField).at(1);
            amountField.instance().onChange({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1000 Р'
                }
            });
            amountField.instance().onBlur({
                persist: () => {},
                target: {
                    name: 'amount',
                    value: '1000 Р'
                }
            });

            const form = wrapper.find(RefillBalanceForm).find('form');
            form.simulate("submit", );
            setImmediate(() => {
                wrapper.update();
                expect(wrapper.find(RefillBalanceForm).props().isValid).toBeTruthy();
                expect(onSubmit).toBeCalled();
                expect(onSubmit).toBeCalledWith({
                    amount: 1000,
                    phone: '+7 (123) 556-7788'
                });
                done();
            })
        });
    })


});
