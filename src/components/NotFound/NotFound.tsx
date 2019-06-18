import * as React from 'react';
import {Header} from "../Header";


export class NotFound extends React.Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <React.Fragment>
                <Header />
                <div className="container d-flex flex-column align-items-center py-5">
                    <div className="display-1 strong">:-(</div>
                    <div className="display-1">404 Not Found</div>
                </div>
            </React.Fragment>
        );
    }
}
