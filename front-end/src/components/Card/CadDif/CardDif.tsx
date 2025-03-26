import "./CardDif.scss";
import React, { FC } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";

interface CardDifProps {
  // Define your props here if needed
  data: any;
}

const CardDif: FC<CardDifProps> = ({ data }) => {
  return (
    <div className="cardDif">
      <div className="cardDif__textContainer">
        <figure className="cardDif__imgContainer">
          <ImgDefault
            className="cardDif__img"
            src={data?.image?.url}
            alt={data?.image?.alt ? data?.image?.alt : data?.image?.title}
          />
        </figure>
        <h3 className="cardDif__title">{data?.title}</h3>
      </div>
      <div className="cardDif__descriptionContainer">
        <h4 className="cardDif__description">
          <TextDefault>{data?.description}</TextDefault>
        </h4>
      </div>
    </div>
  );
};

export default CardDif;
