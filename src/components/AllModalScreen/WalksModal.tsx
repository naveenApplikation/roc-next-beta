import { useMyContext } from '@/app/Context/MyContext';
// import MyListModalLayout from "@/components//modal/Modal";
import WalkListModal from "@/components/modal/Modal";
import React from 'react';

interface WalksModalProps {
    // Define your props here
}

const WalksModal: React.FC<WalksModalProps> = (props) => {

    const { showMap, closeModal, dataDetails, modalType } = useMyContext();

    return (
        <WalkListModal
            isOpen={modalType.walksModal}
            onClose={() => closeModal("walksModal")}
            {...{ showMap }}
            title={dataDetails.name}
            name="walksModal">
            <div style={{ height: "84vh", width: "100%", overflow: 'hidden' }}>
                <iframe
                    style={{ border: 'none' }}
                    height="100%"
                    width="100%"
                    title={dataDetails.name}
                    src={dataDetails?.url}
                ></iframe>
            </div>
        </WalkListModal>
    );
};

export default WalksModal;