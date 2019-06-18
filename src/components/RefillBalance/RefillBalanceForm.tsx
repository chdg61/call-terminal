import { FormikBag, FormikProps, withFormik } from 'formik';
import * as React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as yup from 'yup';
import { RefillBalanceFormMaskField } from './RefillBalanceFormMaskField';

interface Props {
    onSubmit: (values: FormValues) => void;
}

export interface FormValues {
    phone: string;
    amount: string | number;
}

type AllProps = Props & FormikProps<FormValues>;

export class RefillBalanceForm extends React.Component<AllProps> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
            values
        } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <RefillBalanceFormMaskField
                        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        label="Номер телефона"
                        name="phone"
                        placeholder="Введите номер телефона"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.phone}
                        touched={touched.phone}
                    />
                </div>
                <div className="form-group">
                    <RefillBalanceFormMaskField
                        label="Сумма"
                        mask={createNumberMask({
                            prefix: '',
                            suffix: ' ₽',
                            thousandsSeparatorSymbol: ' ',
                        })}
                        value={String(values.amount)}
                        error={errors.amount}
                        touched={touched.amount}
                        placeholder="Введите сумму для пополнения"
                        name="amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Пополнить
                </button>
            </form>
        );
    }
}

function transformAmount (amountStr = ''): string | number {
    return parseFloat(amountStr.replace(/\s/g, '')) || 0;
}

export const RefillBalanceFormWrapper = withFormik<Props, FormValues>({
    validationSchema: (props: Props) => {
        return yup.object().shape({
            phone: yup.string()
                .matches(
                    /^\+7\s\([1-9]\d{2}\)\s\d{3}-\d{4}/i,
                    'Телефон должен быть формата +7(912) 345-5566'
                )
                .required('Поле обязательное для заполнения'),
            amount: yup
                .number()
                .transform(function(value, originalvalue) {
                    if (typeof originalvalue === 'string') {
                        return transformAmount(originalvalue);
                    }

                    return 0;
                })
                .min(1, 'Минимальная сумма платежа - 1 рубль')
                .max(1000, 'Максимальная сумма платежа - 1000 рублей')
                .required('Поле обязательное для заполнения'),
        });
    },

    mapPropsToValues(props: Props): FormValues {
        return {
            amount: '',
            phone: '',
        };
    },

    handleSubmit(values: FormValues, formikBag:  FormikBag<Props, FormValues>) {
        formikBag.props.onSubmit({
            ...values,
            amount: transformAmount(String(values.amount)),
        });
    }
})(RefillBalanceForm);
