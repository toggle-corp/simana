import React from 'react';

import InputContainer from '#components/InputContainer';
import Input, { InputProps } from '#components/Input';

// import styles from './styles.css';

interface Props extends InputProps {
    className?: string;
}

function TextInput(props: Props): React.ReactElement {
    const {
        className,
        label,
        ...otherProps
    } = props;

    return (
        <InputContainer
            className={className}
            label={label}
            // eslint-disable-next-line react/jsx-props-no-spreading
            input={<Input {...otherProps} />}
        />
    );
}

export default TextInput;
