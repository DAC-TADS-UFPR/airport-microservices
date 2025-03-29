import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import "./UserMilesCard.scss";
import { FC } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import ModalAddMiles from "../ModalAddMiles/ModalAddMiles";

interface UserMilesCardProps {
  data?: any;
}

const UserMilesCard: FC<UserMilesCardProps> = ({ data }) => {
  const { openModal } = useModal();

  const buyMiles = () => {
    openModal({
      headerName: "Comprar milhas",
      children: <ModalAddMiles />,
    });
  };

  return (
    <div className="userMilesCard">
      <div className="userMilesCard__row">
        <div className="userMilesCard__row userMilesCard__row--mod">
          <ImgDefault className="userMilesCard__logo" src={"/icons/wallet.svg"} alt="Carteira de Milhas" />
          <span className="userMilesCard__title">Minhas Milhas</span>
        </div>
        <span className="userMilesCard__miles">15,000</span>
      </div>
      <ButtonDefault children={"Comprar milhas"} onClick={buyMiles} />
    </div>
  );
};

export default UserMilesCard;
