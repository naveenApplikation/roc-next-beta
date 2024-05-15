import { useMyContext } from '@/app/Context/MyContext';
// import MyListModalLayout from "@/components//modal/Modal";
import WalkListModal from "@/components/modal/Modal";
import React from 'react';

interface WalksModalProps {
    // Define your props here
}

const BetaExploreModal: React.FC<WalksModalProps> = (props) => {

    const { modalName, showMap, closeModal, modalClick, dataDetails, modalType } = useMyContext();
    const token = window.localStorage.getItem("Token");
    console.log("token" , token);
    
    return (
        <WalkListModal
            isOpen={false}
            onClose={() => closeModal("")}
            {...{ showMap }}
            title={dataDetails.name}
            name="walksModal">
            <div style={{ height: "84vh", width: "100%", overflow: 'hidden' }}>
                <p>hello</p>
            </div>
        </WalkListModal>
    );
};

export default BetaExploreModal;