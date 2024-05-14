import { useMyContext } from '@/app/Context/MyContext';
// import MyListModalLayout from "@/components//modal/Modal";
import WalkListModal from "@/components/modal/Modal";
import React from 'react';

interface WalksModalProps {
    // Define your props here
}

const WalksModal: React.FC<WalksModalProps> = (props) => {

    const { modalName, showMap, closeModal, modalClick, dataDetails, modalType } = useMyContext();

    return (
        <WalkListModal
            isOpen={modalType.walksModal}
            onClose={() => closeModal("walksModal")}
            {...{ showMap }}
            title={dataDetails.name}
            name="walksModal">
            <iframe
                style={{ border: 'none' }}
                height="500px"
                width="100%"
                title={dataDetails.name}
                src={dataDetails?.url}
            ></iframe>
        </WalkListModal>
    );
};

export default WalksModal;