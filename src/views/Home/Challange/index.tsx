import React from 'react';

import styles from './styles.css';

function Challange(p) {
    const { challange } = p;

    return (
        <div className={styles.challange}>
            { challange?.title }
        </div>
    );
}

export default Challange;
