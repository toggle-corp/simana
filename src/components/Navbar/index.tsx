import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { appName } from '#utils/constants';

import styles from './styles.css';

interface Props {
    className?: string;
}

const Navbar = (props: Props) => {
    const { className } = props;

    return (
        <nav className={_cs(className, styles.navbar)}>
            <div className={styles.appBrand}>
                { appName }
            </div>
        </nav>
    );
};

export default Navbar;
