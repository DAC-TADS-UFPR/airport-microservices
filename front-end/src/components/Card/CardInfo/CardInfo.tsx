import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";
import React, { FC } from "react";
import "./CardInfo.scss";

interface CardInfoProps {
  data: any;
}

const CardInfo: FC<CardInfoProps> = ({ data }) => {
  return (
    <div className="cardInfo">
      <div className="cardInfo__container">
        <figure className="cardInfo__imgContainer">
          <ImgDefault className="cardInfo__img" src={data?.image?.url} alt={data?.image?.alt} />
        </figure>
        <div className="cardInfo__content">
          <h2 className="cardInfo__title">
            <TextDefault>{data?.title}</TextDefault>
          </h2>
          <h3 className="cardInfo__description">
            <TextDefault>{data?.description}</TextDefault>
          </h3>
          <div className="cardInfo__buttonContainer">
            <ButtonDefault data={data?.link} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
