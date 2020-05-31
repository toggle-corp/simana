import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { Challange } from '#types';

import styles from './styles.css';

interface Props {
    className?: string;
    challange: Challange;
}

function ChallangeView(p: Props) {
    const {
        challange,
        className,
    } = p;

    return (
        <div className={_cs(className, styles.challange)}>
            { challange?.title }
        </div>
    );
}

export default React.memo(ChallangeView);
