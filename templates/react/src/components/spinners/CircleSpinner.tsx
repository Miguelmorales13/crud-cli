import React, {FunctionComponent} from 'react';
import './CircleSpinner.css'

interface OwnProps {
}

type Props = OwnProps;

const CircleSpinner: FunctionComponent<Props> = (props) => {

    return (
        <div className="spinner">
            <div className="double-bounce1"/>
            <div className="double-bounce2"/>
        </div>
    );
};

export default CircleSpinner;
