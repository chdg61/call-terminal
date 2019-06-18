import React from 'react';

import AlertS from 'react-s-alert';


interface Props {
}

export class Alert extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <AlertS
                effect="slide"
                position="top-right"
                stack={{
                    limit: 3
                }}
            />
        );
    }
}
