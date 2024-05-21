import { useMyContext } from '@/app/Context/MyContext';
// import MyListModalLayout from "@/components//modal/Modal";
import WalkListModal from "@/components/modal/Modal";
import React from 'react';
import CommonButton from '../button/CommonButton';

interface WalksModalProps {
    // Define your props here
}

const BetaExploreModal: React.FC<WalksModalProps> = (props) => {

    const { modalName, showMap, closeModal } = useMyContext();

    return (
        <WalkListModal
            isOpen={modalName === "betaExploreModal"}
            onClose={() => closeModal("")}
            {...{ showMap }}
            title="Welcome to our beta!"
            name="walksModal">
            <div style={{ height: "84vh", fontSize: "16px", width: "100%", overflow: 'hidden', padding: "20px" }}>
                <p>As we fine-tune our features, your feedback is invaluable. While not everything may be fully functional yet, your participation is key in shaping the future of our platform. Thank you for being part of this journey with us.</p>
                <div
                    style={{ padding: "20px 0px" }}
                    onClick={() => closeModal("")}
                >
                    <CommonButton text="Explore ROC" />
                </div>
            </div>
        </WalkListModal>
    );
};

export default BetaExploreModal;