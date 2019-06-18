import * as React from 'react';
import { Link } from 'react-router-dom';


export class Header extends React.Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <header>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <Link to="/" className="navbar-brand d-flex align-items-center">
                            <h1>Пополнение счета</h1>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}
