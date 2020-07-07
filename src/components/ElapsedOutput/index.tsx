import React from 'react';
import { _cs } from '@togglecorp/fujs';

import useTimer from '#hooks/useTimer';
import { ROUND_DURATION } from '#utils/constants';

import styles from './styles.css';

interface ElapsedOutputProps<T> {
    className?: string;
    initialTimestamp?: number;
    countdown?: T;
    targetDuration?: T extends never ? never : number;
    run?: boolean;
    totalDuration?: number;
}

function ElapsedOutput<T>(p: ElapsedOutputProps<T>) {
    const {
        className,
        initialTimestamp,
        targetDuration = ROUND_DURATION,
        countdown,
        run = false,
        totalDuration = 0,
    } = p;

    const { ticks, reset } = useTimer(run);

    React.useEffect(() => {
        reset();
    }, [reset, initialTimestamp]);

    const [
        ss,
        mm,
    ] = React.useMemo(() => {
        let totalSeconds = 0;

        if (!run) {
            totalSeconds = Math.floor(totalDuration / 1000);
        } else if (ticks.length > 0) {
            const duration = ticks.reduce((acc, val) => acc + val, 0);
            totalSeconds = Math.max(0, Math.floor(
                (countdown ? (targetDuration - duration) : duration) / 1000,
            ));
        }

        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);

        return [
            seconds.toString().padStart(2, '00'),
            minutes.toString().padStart(2, '00'),
        ];
    }, [ticks, targetDuration, countdown, run, totalDuration]);

    return (
        <div className={_cs(className, styles.elapsedOutput)}>
            <div className={styles.min}>
                {mm}
            </div>
            <div className={styles.separator}>
                :
            </div>
            <div className={styles.sec}>
                {ss}
            </div>
        </div>
    );
}

export default ElapsedOutput;
