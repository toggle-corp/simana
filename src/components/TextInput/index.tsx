import React from 'react';
import { _cs } from '@togglecorp/fujs';

import InputContainer from '#components/InputContainer';
import Input from '#components/Input';

import styles from './styles.css';

interface Props extends React.HTMLProps<HTMLInputElement> {
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
            label={label}
            input={<Input />}
        />
    );
}

export default TextInput;
