import React from "react";
import OrderOnlineModalLayout from "@/components/modal/Modal";
import OrderOnlineModal from "@/components/modal/orderOnline/orderOnlineModal";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
    showMap:boolean
}

const PlaceOrderOnlineModalScreen: React.FC<DashboardSearchContainerProps> = ({showMap})=> {

    const { modalName, closeModal, modalClick, dataDetails,modalType } = useMyContext();

  return (
    <>
      <OrderOnlineModalLayout
          isOpen={modalType.orderOnlineModal}
          onClose={() => closeModal("orderOnlineModal")}
          {...{ showMap }}
          title="Order Online"
          name="orderOnlineModal"
        >
          <OrderOnlineModal
            previousModal={() => modalClick("orderOnlineModal")}
          />
        </OrderOnlineModalLayout>
    </>
  );
};

export default PlaceOrderOnlineModalScreen;
