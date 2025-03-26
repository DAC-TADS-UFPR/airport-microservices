import React, { FC } from "react";
import "./CardMini.scss";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";
import Link from "next/link";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface CardUnidadeProps {
  data: any;
}

const CardUnidade: FC<CardUnidadeProps> = ({ data }) => {
  return (
    <LinkDefault href={data?.link} className="cardMini">
      <figure className="cardMini__imgContainer">
        <ImgDefault
          className="imgEmphasis"
          src={data?.acf?.sectionOne?.image_thumb?.url}
          alt={data?.acf?.sectionOne?.image_thumb?.alt}
        />
      </figure>
      <div className="cardMini__content">
        <h2 className="cardMini__title">
          <TextDefault>{data?.acf?.sectionOne?.title}</TextDefault>
        </h2>
        <div className="cardMini__contentHover">
          <h3 className="cardMini__description">
            <TextDefault>{data?.acf?.sectionOne?.description}</TextDefault>
          </h3>
        </div>
        <div className="cardMini__btnContainer">
          <div className="div cardMini__btn">Ver detalhes</div>
        </div>
      </div>
    </LinkDefault>
  );
};

export default CardUnidade;
