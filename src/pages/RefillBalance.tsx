import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Header } from '../components/Header';
import { RefillBalanceFormWrapper } from '../components/RefillBalance';
import { FormValues } from '../components/RefillBalance/RefillBalanceForm';
import { IOperatorModel } from '../models/OperatorModel';
import { RootReducer } from '../store/modules';
import { operatorDetailLoad, refillBalance } from '../store/modules/operators';
import { selectOperatorDetail } from '../store/selectors/operators';
import { RefillBalanceFormValues } from '../shared/refill-balance';


interface Props {
}

interface StateProps {
    operator: IOperatorModel | null;
}

interface DispatchProps {
    loadOperator(slug: string): void;
    refillBalance(values: RefillBalanceFormValues): void;
}

type AllProps = Props & StateProps & DispatchProps & RouteComponentProps<{slug: string}>;

export class RefillBalance extends React.Component<AllProps>{


    constructor(props: AllProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(): void {
        this.props.loadOperator(this.props.match.params.slug);
    }

    onSubmit(values: FormValues) {
        if (this.props.operator) {
            this.props.refillBalance({
                phone: values.phone,
                amount: values.amount as number,
                operatorSlug: this.props.operator!.slug,
            });
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const name = this.props.operator && this.props.operator.name;

        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-3 mb-0">
                            Оператор <span className="text-uppercase">{name}</span>
                        </h6>
                        <RefillBalanceFormWrapper onSubmit={this.onSubmit} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: RootReducer): StateProps {
    return {
        operator: selectOperatorDetail(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        loadOperator: bindActionCreators(operatorDetailLoad, dispatch),
        refillBalance: bindActionCreators(refillBalance, dispatch),
    };
}

export const RefillBalanceConnected = connect(mapStateToProps, mapDispatchToProps)(RefillBalance);
