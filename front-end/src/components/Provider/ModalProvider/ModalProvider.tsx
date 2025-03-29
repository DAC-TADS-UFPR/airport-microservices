// ModalProvider.js
"use client";
import ModalItem from "./ModalItem/ModalItem";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuid4 } from "uuid";

type ModalProps = {
  headerName: string | ReactNode;
  children: ReactNode;
};

type ModalContextType = {
  openModal: (props: ModalProps) => void;
  closeModal: (id?: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export type ModalData = {
  id: string;
  props: ModalProps;

  active: boolean;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalData[]>([]);
  const params = useSearchParams();
  useEffect(() => setModals([]), [params]);

  const openModal = (props: ModalProps) => {
    const id = uuid4();
    const newModal: ModalData = { id, props, active: true };
    setModals((prevModals) => [...prevModals, newModal]);
  };

  const closeModal = (id?: string) => {
    if (!id) return;
    setModals((prevModals) =>
      prevModals.map((m) => {
        if (m.id === id) m.active = false;
        return m;
      })
    );
  };

  useEffect(() => {
    if (!modals?.length) return;
    const timer = setTimeout(() => {
      setModals((prevModals) => (prevModals.every((m) => m.active === false) ? [] : prevModals));
    }, 350);
    return () => clearTimeout(timer);
  }, [modals]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modalData, index) => (
        <ModalItem key={modalData.id + modalData.active} modalData={modalData} closeModal={closeModal} />
      ))}
    </ModalContext.Provider>
  );
};
