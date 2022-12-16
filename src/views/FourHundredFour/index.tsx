import React from 'react';
import { tx } from '@transifex/native';
import { T } from '@transifex/react';

import styles from './styles.css';

tx.init({ token: process.env.REACT_APP_TRANSIFEX_TOKEN, filterTags: 'gameplay' });

const FourHundredFour = () => (
    <div className={styles.fourHundredFour}>
        <h1 className={styles.heading}>
            <T _str="404" />
        </h1>
        <p className={styles.message}>
            <T _str="The page you are looking for does not exist!" />
        </p>
    </div>
);

export default FourHundredFour;
