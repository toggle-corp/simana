import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props {
    className?: string;
    regionTitle?: string;
    facts: string[];
}

function Fact(p: Props) {
    const {
        className,
        facts,
        regionTitle,
    } = p;

    const fact = React.useMemo(() => {
        if (facts.length === 0) {
            return undefined;
        }

        const randomIndex = Math.floor(Math.random() * facts.length);
        return facts[randomIndex];
    }, [facts]);

    if (!fact) {
        return null;
    }

    return (
        <div className={_cs(className, styles.fact)}>
            <h4 className={styles.heading}>
                {`Quick fact about ${regionTitle}`}
            </h4>
            <div className={styles.content}>
                { fact }
            </div>
        </div>
    );
}

export default Fact;
