import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface TextOutputProps {
    value: React.ReactNode;
    label: React.ReactNode;
    className?: string;
}

function TextOutput(p: TextOutputProps) {
    const {
        label,
        value,
        className,
    } = p;

    return (
        <div className={_cs(className, styles.textOutput)}>
            <div className={styles.label}>
                { label }
            </div>
            <div className={styles.value}>
                { value }
            </div>
        </div>
    );
}

export default TextOutput;
