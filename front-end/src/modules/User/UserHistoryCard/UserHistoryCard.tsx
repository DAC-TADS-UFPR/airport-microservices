import "./UserHistoryCard.scss";
import { FC } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type Info = "Earned" | "Used";

interface UserHistoryCardProps {
  data?: any;
  info?: Info;
}

const UserHistoryCard: FC<UserHistoryCardProps> = ({ info }) => {
  return (
    <div className="userHistoryCard">
      <ImgDefault
        className="userHistoryCard__logo"
        src={info === "Earned" ? "/icons/chartLine.svg" : "/icons/chartDown.svg"}
        alt="Quantidade de milhas ganhas"
      />
      <div className="userHistoryCard__column">
        <div className="userHistoryCard__title">{info === "Earned" ? "Milhas Adquiridas" : "Milhas Usadas"}</div>
        <span className="userHistoryCard__miles">1,000</span>
      </div>
    </div>
  );
};

export default UserHistoryCard;
