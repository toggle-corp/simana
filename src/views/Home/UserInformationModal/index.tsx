import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Haze from '#components/Haze';
import TextInput from '#components/TextInput';
import Button from '#components/Button';
import styles from './styles.css';

interface Props {
}

function UserInformationModal(props: Props): React.ReactElement {
    const { onStartClick } = props;

    const [name, setName] = React.useState('');
    const handleStartClick = React.useCallback(() => {
        if (onStartClick) {
            onStartClick(name);
        }
    }, [name, onStartClick]);

    return (
        <Haze>
            <div className={styles.userInformationModal}>
                <TextInput
                    value={name}
                    onChange={setName}
                    label="Enter your name"
                />
                <Button onClick={handleStartClick}>
                    Start
                </Button>
            </div>
        </Haze>
    );
}

export default UserInformationModal;
