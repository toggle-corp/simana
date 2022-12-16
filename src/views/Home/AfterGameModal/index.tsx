import React from 'react';
import { addSeparator } from '@togglecorp/fujs';
import { T, useT } from '@transifex/react';

import Haze from '#components/Haze';
import Button from '#components/Button';

import {
    Challenge,
    GameMode,
    AvatarKey,
} from '#types';
import { calculateScore } from '#utils/common';
import {
    gameModes,
    avatars,
} from '#utils/constants';

import TextOutput from '#components/TextOutput';
import ElapsedOutput from '#components/ElapsedOutput';

import tcLogo from '#assets/togglecorp-logo.png';
import paradygmTvLogo from '#assets/paradygm-tv-logo.jpg';
import innovateTechLogo from '#assets/innovate-tech-logo.png';

import styles from './styles.css';

const partners = [
    {
        key: 'ptv',
        name: 'Paradygm TV',
        url: 'https://www.youtube.com/channel/UCpzxtwBLa0BoJ2aKua5CIXg',
        logo: paradygmTvLogo,
    },
    {
        key: 'it',
        name: 'Innovate Tech',
        url: 'https://www.innovatetech.io/',
        logo: innovateTechLogo,
    },
    {
        key: 'tc',
        name: 'Togglecorp Solutions Pvt. Ltd.',
        url: 'https://togglecorp.com',
        logo: tcLogo,
    },
];

interface Props {
    onPlayAgainClick: () => void;
    onNicknameClick: () => void;
    onGameModeClick: () => void;
    challenges: Challenge[];
    mode: GameMode,
    username: string;
    ticks: number[];
    avatar: AvatarKey;
}

function AfterGameModal(props: Props): React.ReactElement {
    const {
        onPlayAgainClick,
        challenges,
        onGameModeClick,
        onNicknameClick,
        mode,
        username,
        avatar,
        ticks,
    } = props;

    const score = React.useMemo(() => (
        calculateScore(challenges)
    ), [challenges]);

    const elapsed = React.useMemo(() => (
        ticks.reduce((acc, val) => acc + val, 0)
    ), [ticks]);

    const t = useT();

    return (
        <Haze>
            <div className={styles.afterGamePlayModal}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        <T _str="Game over" _tags="gameplay" />
                    </h2>
                </header>
                <div className={styles.content}>
                    <div className={styles.score}>
                        <div className={styles.label}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <img
                                className={styles.avatar}
                                src={avatars[avatar]}
                            />
                            {`${username} scored:`}
                        </div>
                        <div className={styles.value}>
                            { addSeparator(score) }
                        </div>
                    </div>
                    <TextOutput
                        className={styles.mode}
                        label={t('Mode:', { _tags: 'gameplay' })}
                        value={gameModes[mode]}
                    />
                    <TextOutput
                        className={styles.time}
                        label={t('Time:', { _tags: 'gameplay' })}
                        value={(
                            <ElapsedOutput
                                totalDuration={elapsed}
                            />
                        )}
                    />
                </div>
                <div className={styles.actions}>
                    <Button onClick={onNicknameClick}>
                        <T _str="Nickname" _tags="gameplay" />
                    </Button>
                    <Button onClick={onGameModeClick}>
                        <T _str="Game mode" _tags="gameplay" />
                    </Button>
                    <Button onClick={onPlayAgainClick}>
                        <T _str="Play again" _tags="gameplay" />
                    </Button>
                </div>
            </div>
            <div className={styles.partnerList}>
                { partners.map((p) => (
                    <a
                        key={p.key}
                        className={styles.partner}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={p.logo}
                            alt={p.name}
                        />
                    </a>
                ))}
            </div>
        </Haze>
    );
}

export default AfterGameModal;
