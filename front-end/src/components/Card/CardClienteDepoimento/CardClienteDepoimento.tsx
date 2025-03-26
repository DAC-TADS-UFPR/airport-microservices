import "./CardClienteDepoimento.scss";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import getItem from "@/data/lib/getItem";
import React, { FC } from "react";
import TextDefault from "@/components/TextDefault/TextDefault";
interface CardClienteDepoimentoProps {
  id?: string;
  data?: any;
}

const CardClienteDepoimento: FC<CardClienteDepoimentoProps> = async ({ id, data }) => {
  const item = id ? await getItem(id, "clientes", "sectionOne") : data;
  return (
    <div className="cardClienteDepoimento">
      <div className="cardClienteDepoimento__container">
        <figure className="cardClienteDepoimento__imgContainer">
          <ImgDefault
            quality={100}
            className="cardClienteDepoimento__imgEmphasis"
            src={item?.image?.url}
            alt={item?.image?.alt}
          />
        </figure>
        <div className="cardClienteDepoimento__content">
          <div className="cardClienteDepoimento__description">
            <TextDefault>{item?.description}</TextDefault>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClienteDepoimento;
