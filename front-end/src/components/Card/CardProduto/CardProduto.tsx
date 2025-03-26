import React, { FC } from "react";
import "./CardProduto.scss";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface CardProdutoProps {
  data: any;
}

const CardProduto: FC<CardProdutoProps> = ({ data }) => {
  return (
    <>
      <LinkDefault href={data?.link}>
        <div className="cardProduto">
          <figure className="cardProduto__imgContainer">
            <ImgDefault
              className="imgEmphasis"
              src={data?.acf?.sectionOne?.image_thumb?.url}
              alt={data?.acf?.sectionOne?.image_thumb?.alt}
            />
          </figure>
          <div className="cardProduto__content">
            <h2 className="cardProduto__title cardProduto__title--1">{data?.title?.rendered}</h2>
            <div className="cardProduto__contentHover">
              <h3 className="cardProduto__title cardProduto__title--2">
                <TextDefault>{data?.acf?.sectionOne?.description}</TextDefault>
              </h3>
            </div>
            <div className="cardProduto__btnContainer">
              <div className="div cardProduto__btn">Ver detalhes</div>
            </div>
          </div>
        </div>
      </LinkDefault>
    </>
  );
};

export default CardProduto;
