import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props<T> {
    className?: string;
    name?: T,
    children: React.ReactNode;
    onClick?: (name?: T) => void;
    type?: 'button' | 'submit';
}

function Button<T=string>(props: Props<T>): React.ReactElement {
    const {
        children,
        className,
        onClick,
        name,
        type,
    } = props;

    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [name, onClick]);

    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={_cs(className, styles.button)}
            onClick={handleClick}
        >
            { children }
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
};

export default Button;
