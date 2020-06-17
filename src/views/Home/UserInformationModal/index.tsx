import React from 'react';
import { FaUserSecret } from 'react-icons/fa';

import Haze from '#components/Haze';
import TextInput from '#components/TextInput';
import Button from '#components/Button';
import { appName } from '#utils/constants';
import styles from './styles.css';

interface Props {
    onStartClick: (name: string) => void;
}

function UserInformationModal(props: Props): React.ReactElement {
    const { onStartClick } = props;

    const [name, setName] = React.useState('');
    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();

        if (onStartClick) {
            onStartClick(name || 'Anonymous User');
        }
    }, [name, onStartClick]);

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
                    <div className={styles.avatar}>
                        <FaUserSecret className={styles.icon} />
                    </div>
                    <div className={styles.inputs}>
                        <TextInput
                            value={name}
                            onChange={setName}
                            label="Enter nickname"
                            autoFocus
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
