"use client";
import "./ModalCenter.scss";
import { ReactNode, forwardRef, createContext, useContext } from "react";

interface ModalCenterProps {
  headerName: string | ReactNode;
  children: ReactNode;
  onClose: () => void;
  active: boolean;
}

const ModalContext = createContext<{ closeModal: () => void } | undefined>(undefined);

export const useModalCenter = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalCenter must be used within a ModalContext.Provider");
  }
  return context;
};

const ModalCenter = forwardRef<HTMLDivElement, ModalCenterProps>(({ onClose, headerName, children, active }, ref) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <ModalContext.Provider value={{ closeModal: handleClose }}>
      <div className={` modalCenter ${active ? "modalCenter--active" : ""}`}>
        <div ref={ref} className={`modal-${active} modalCenter__container ${active ? "modalCenter__container--active" : ""}`}>
          <div className="modalCenter__content">
            <div className="modalCenter__header">
              <span className="modalCenter__title">{headerName}</span>
              <button className="modalCenter__buttonClose" type="button" onClick={handleClose} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
});

export default ModalCenter;
