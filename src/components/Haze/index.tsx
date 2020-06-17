import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Portal from '#components/Portal';
import styles from './styles.css';

interface Props {
    className?: string;
    children: React.ReactNode;
}

function Haze(p: Props): React.ReactElement {
    React.useEffect(() => {
        const html = document.getElementsByTagName('html')[0];
        const prevValue = html.style.overflow;
        html.style.overflow = 'hidden';

        return () => {
            html.style.overflow = prevValue;
        };
    });

    return (
        <Portal>
            <div className={_cs(p.className, styles.haze)}>
                { p.children }
            </div>
        </Portal>
    );
}

export default Haze;
