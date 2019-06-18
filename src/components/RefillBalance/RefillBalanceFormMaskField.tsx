import classnames from 'classnames';
import * as React from 'react';
import MaskedInput from 'react-text-mask';

interface Props {
    name: string;
    label: string;
    mask: any;
    value: string;
    error: string;
    touched: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
}


export class RefillBalanceFormMaskField extends React.Component<Props> {

    constructor(props: Readonly<Props>) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static defaultProps: Partial<Props> = {
        placeholder: '',
    }

    private onChange(e: React.ChangeEvent<HTMLInputElement>){
        if(this.props.onChange && typeof this.props.onChange === 'function'){
            this.props.onChange(e);
        }
    }

    private onBlur(e: React.FocusEvent<HTMLInputElement>){
        if(this.props.onBlur && typeof this.props.onBlur === 'function'){
            this.props.onBlur(e);
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {
            name,
            label,
            mask,
            touched,
            error,
            value,
            placeholder
        } = this.props;

        return (
            <React.Fragment>
                <label htmlFor={name}>
                    {label}
                </label>
                <MaskedInput
                    mask={mask}
                    className={classnames('form-control', {
                        'is-invalid': error && touched,
                    })}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name={name}
                    guide
                />
                {touched && !!error && (
                    <div className="invalid-feedback">
                        {error}
                    </div>
                )}
            </React.Fragment>
        );
    }
}
