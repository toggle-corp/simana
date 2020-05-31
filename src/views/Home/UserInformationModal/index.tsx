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
    const handleStartClick = React.useCallback(() => {
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
                <div className={styles.content}>
                    <div className={styles.avatar}>
                        <FaUserSecret className={styles.icon} />
                    </div>
                    <div className={styles.inputs}>
                        <TextInput
                            value={name}
                            onChange={setName}
                            label="Enter nickname"
                        />
                    </div>
                    <div className={styles.actions}>
                        <Button onClick={handleStartClick}>
                            Start
                        </Button>
                    </div>
                </div>
            </div>
        </Haze>
    );
}

export default UserInformationModal;
