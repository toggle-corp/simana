import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { Message } from '#types';

import styles from './styles.css';

interface Props {
    className?: string;
    message?: Message;
}

function MessageView(props: Props) {
    const {
        className,
        message,
    } = props;

    return (
        <div className={_cs(className, styles.message)}>
            <div
                key={message?.timestamp}
                className={styles.current}
            >
                { message?.text }
            </div>
        </div>
    );
}

export default MessageView;
