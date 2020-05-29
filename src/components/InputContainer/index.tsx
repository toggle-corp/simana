import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props {
}

function InputContainer(props: Props) {
    const {
        className,
        labelClassName,
        label,
        inputSectionClassName,
        input,
    } = props;

    return (
        <div className={_cs(className, styles.inputContainer)}>
            <div className={_cs(labelClassName, styles.label)}>
                { label }
            </div>
            <div className={_cs(inputSectionClassName, styles.inputSection)}>
                { input }
            </div>
        </div>
    );
}

export default InputContainer;
