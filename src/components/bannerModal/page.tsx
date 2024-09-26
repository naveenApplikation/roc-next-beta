"use client"

import React from 'react';
import Modal from '../modal/Modal';
import { useMyContext } from '@/app/Context/MyContext';

interface BannerModalProps {
    // Define your props here
}

const BannerModal: React.FC<BannerModalProps> = () => {
    const { showMap, modalType, closeModal } = useMyContext()
    console.log("updatedState", modalType.adsBanner)
    return (
        <Modal
            isOpen={modalType.adsBanner}
            name="adsBanner"
            showMap={showMap}
            onClose={() => closeModal("adsBanner")}
        >
            <iframe
                style={{ border: "none", height: "100%", overflow: 'hidden' }}
                src="https://hub.roc.je/featured/jersey-war-tunnels-escape-rooms"
                height="500px"
                width="100%"
                title="Jersey War Tunnels Escape Rooms"
                className="iframe_body"
            ></iframe>
        </Modal>
    );
};

export default BannerModal;