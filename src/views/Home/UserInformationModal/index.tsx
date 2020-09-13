import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Haze from '#components/Haze';
import TextInput from '#components/TextInput';
import Button from '#components/Button';
import {
    appName,
    avatars,
} from '#utils/constants';
import { AvatarKey } from '#types';


import styles from './styles.css';


interface Props {
    onStartClick: (name: string, avatar: AvatarKey) => void;
}

const DEFAULT_USERNAME = 'Anonymous user';

function UserInformationModal(props: Props): React.ReactElement {
    const { onStartClick } = props;

    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState<AvatarKey>('avatar1');
    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();

        if (onStartClick) {
            onStartClick(name || DEFAULT_USERNAME, avatar);
        }
    }, [name, avatar, onStartClick]);

    return (
        <Haze>
            <div className={styles.userInformationModal}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        { appName }
                    </h2>
                </header>
                <form
                    className={styles.content}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.avatarList}>
                        {Object.keys(avatars).map((avatarKey) => (
                            <button
                                key={avatarKey}
                                onClick={() => { setAvatar(avatarKey as AvatarKey); }}
                                className={_cs(
                                    styles.avatarButton,
                                    avatar === avatarKey && styles.active,
                                )}
                                type="button"
                            >
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img
                                    className={styles.avatar}
                                    src={avatars[avatarKey as AvatarKey]}
                                />
                            </button>
                        ))}
                    </div>
                    <div className={styles.inputs}>
                        <TextInput
                            value={name}
                            onChange={setName}
                            label="Enter nickname"
                            autoFocus
                            placeholder={DEFAULT_USERNAME}
                        />
                    </div>
                    <div className={styles.actions}>
                        <Button type="submit">
                            Start
                        </Button>
                    </div>
                </form>
            </div>
        </Haze>
    );
}

export default UserInformationModal;
