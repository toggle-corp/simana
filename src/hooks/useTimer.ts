import React from 'react';
import {
    DEFAULT_TICK_INTERVAL,
} from '#utils/constants';

export default function useTimer(
    use: boolean,
    tickInterval: number = DEFAULT_TICK_INTERVAL,
) {
    const [ticks, setTicks] = React.useState<number []>([]);
    const lastTickTimestampRef = React.useRef(new Date().getTime());
    const intervalIdRef = React.useRef<number | undefined>();

    const handleTick = React.useCallback((discardTick = false) => {
        const currentTimestamp = new Date().getTime();
        const tickDuration = currentTimestamp - lastTickTimestampRef.current;
        if (!discardTick) {
            setTicks((prevTicks) => [...prevTicks, tickDuration]);
        }
        lastTickTimestampRef.current = currentTimestamp;

        return currentTimestamp;
    }, [setTicks]);

    const setInterval = React.useCallback(() => {
        intervalIdRef.current = window.setInterval(handleTick, tickInterval);
    }, [intervalIdRef, handleTick, tickInterval]);

    const clearInterval = React.useCallback(() => {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = undefined;
    }, [intervalIdRef]);

    React.useEffect(() => {
        if (use) {
            const currentTimestamp = new Date().getTime();
            lastTickTimestampRef.current = currentTimestamp;

            setInterval();
            setTicks([]);
        }

        return clearInterval;
    }, [use, setTicks, setInterval, clearInterval]);

    const forceTick = React.useCallback((discardPreviousTick = true) => {
        clearInterval();
        const timestamp = handleTick(discardPreviousTick);
        setInterval();
        return timestamp;
    }, [clearInterval, setInterval, handleTick]);

    const reset = React.useCallback(() => {
        const currentTimestamp = new Date().getTime();
        lastTickTimestampRef.current = currentTimestamp;
        clearInterval();
        setTicks([]);

        if (use) {
            setInterval();
        }
    }, [use, clearInterval, setInterval, setTicks]);

    return React.useMemo(() => ({
        ticks,
        forceTick,
        reset,
    }), [ticks, forceTick, reset]);
}
