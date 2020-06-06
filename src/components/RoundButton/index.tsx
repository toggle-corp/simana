import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props<T> {
    className?: string;
    name?: T,
    children: React.ReactNode;
    onClick: (name?: T) => void;
    tooltip?: string;
}

function RoundButton<T=string>(props: Props<T>): React.ReactElement {
    const {
        children,
        className,
        onClick,
        name,
        tooltip,
    } = props;

    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [name, onClick]);

    return (
        <button
            title={tooltip}
            type="button"
            className={_cs(className, styles.roundButton)}
            onClick={handleClick}
        >
            { children }
        </button>
    );
}

export default RoundButton;
