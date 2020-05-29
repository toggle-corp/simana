import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props<T> {
    className?: string;
    name?: T,
    children: React.ReactNode;
    onClick: (name?: T) => void;
}

function Button<T=string>(props: Props<T>): React.ReactElement {
    const {
        children,
        className,
        onClick,
        name,
    } = props;

    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [name, onClick]);

    return (
        <button
            type="button"
            className={_cs(className, styles.button)}
            onClick={handleClick}
        >
            { children }
        </button>
    );
}

export default Button;
