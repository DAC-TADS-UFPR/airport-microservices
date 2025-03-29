"use client";
import React, { memo } from "react";
import { ModalData } from "../ModalProvider";
import useClickOutside from "@/hooks/useClickOutside";

import ModalCenter from "@/components/Modal/ModalCenter/ModalCenter";

type ModalItemProps = {
  modalData: ModalData;
  closeModal: (id: string) => void;
};

const ModalItem = memo(
  ({ modalData, closeModal }: ModalItemProps) => {
    const { id, props, active } = modalData;
    const [activeLocal, setActive, ref] = useClickOutside({
      initialState: active,
      groupClass: ".modal-true",
      callBackInactive: () => closeModal(id),
      ignoreClasses: ["popOver"],
    });

    const modalProps = {
      active: activeLocal,
      onClose: () => closeModal(id),
      headerName: props.headerName,
      ref,
    };

    const modalContent = <ModalCenter {...modalProps}>{props.children}</ModalCenter>;

    return modalContent;
  },
  (prevProps, nextProps) => prevProps.modalData === nextProps.modalData
);

export default ModalItem;
