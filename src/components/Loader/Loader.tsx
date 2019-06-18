import React from 'react';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {selectLoaderFlag} from "../../store/selectors/application";
import {RootReducer} from '../../store/modules';
import styles from './Loader.module.scss';


interface Props {
}

interface StateProps {
    loading: boolean;
}

interface DispatchProps {
}

interface AllProps extends Props, StateProps, DispatchProps {
}

export class Loader extends React.Component<AllProps> {
    public render(): React.ReactNode {
        if (this.props.loading) {
            return (
                <div className={styles.loader}>
                    <div className={styles.loader__block} />
                </div>
            );
        }

        return null;
    }
}

function mapStateToProps(state: RootReducer): StateProps {
    return {
        loading: selectLoaderFlag(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
    };
}

export const LoaderConnected = connect(mapStateToProps, mapDispatchToProps)(Loader);
