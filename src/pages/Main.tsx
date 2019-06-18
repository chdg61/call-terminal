import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Header } from '../components/Header';
import { OperatorItem } from '../components/Operator';
import { IOperatorModel } from '../models/OperatorModel';
import { RootReducer } from '../store/modules';
import { operatorListLoad } from '../store/modules/operators';
import { selectOperatorList } from '../store/selectors/operators';

interface Props {
}

interface StateProps {
    operators: IOperatorModel[];
}

interface DispatchProps {
    loadOperators(): void;
}

type AllProps = Props & StateProps & DispatchProps;


export class Main extends React.Component<AllProps>{

    componentDidMount(): void {
        this.props.loadOperators();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-3 mb-0">Операторы</h6>
                        {this.props.operators.map((operator) => {
                            return (
                                <OperatorItem
                                    operator={operator}
                                    key={operator.slug}
                                />
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: RootReducer): StateProps {
    return {
        operators: selectOperatorList(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        loadOperators: bindActionCreators(operatorListLoad, dispatch),
    };
}

export const MainConnected = connect(mapStateToProps, mapDispatchToProps)(Main);
