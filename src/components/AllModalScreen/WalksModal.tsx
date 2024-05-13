import { useMyContext } from '@/app/Context/MyContext';
import React from 'react';

interface WalksModalProps {
    // Define your props here
}

const WalksModal: React.FC<WalksModalProps> = (props) => {

    const { dataDetails } = useMyContext();
    console.log("dataDetailsdataDetails", dataDetails)

    return (
        <iframe
            style={{ border: 'none' }}
            src={dataDetails?.url} height="500px" width="100%" title="Leave Feedback"></iframe>
    );
};

export default WalksModal;