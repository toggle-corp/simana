import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'value'>;
interface Props extends InputProps {
    className?: string;
    value: string;
    onChange: (value: string, name?: string | undefined) => void;
    name?: string;
}

function Input(props: Props): React.ReactElement {
    const {
        className,
        onChange,
        name,
        value,
        ...otherProps
    } = props;

    const handleChange = React.useCallback((e) => {
        if (onChange) {
            onChange(e.target.value, name);
        }
    }, [onChange, name]);

    return (
        <input
            className={_cs(className, styles.input)}
            onChange={handleChange}
            value={value}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default Input;
