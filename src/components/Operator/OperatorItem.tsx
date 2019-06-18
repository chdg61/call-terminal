import * as React from 'react';
import { Link } from 'react-router-dom';
import { IOperatorModel } from '../../models/OperatorModel';

interface Props {
    operator: IOperatorModel;
}

export class OperatorItem extends React.Component<Props> {

    componentDidMount(): void {
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { operator } = this.props;
        return (
            <div className="media text-muted pt-3">
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <strong className="text-gray-dark">
                            {operator.name}
                        </strong>
                        <Link to={`/refill/${operator.slug}`}>Пополнить</Link>
                    </div>
                </div>
            </div>
        );
    }
}
