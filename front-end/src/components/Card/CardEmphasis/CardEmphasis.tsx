import "./CardEmphasis.scss";
import React, { FC } from "react";
import ButtonText from "@/components/Buttons/ButtonText/ButtonText";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";

interface CardEmphasisProps {
  // Define your props here if needed
  data: any;
  slug: string;
}

const CardEmphasis: FC<CardEmphasisProps> = ({ data, slug }) => {
  const item = data?.acf?.sectionOne?.title ? data?.acf?.sectionOne : data;
  return (
    <div className="cardEmphasis">
      <div className="cardEmphasis__textContainer">
        <h3 className="cardEmphasis__slug">
          <TextDefault>{slug}</TextDefault>
        </h3>
        <h2 className="cardEmphasis__title">
          <TextDefault>{item?.title}</TextDefault>
        </h2>
        <div className="cardEmphasis__description">
          <TextDefault>{item?.description}</TextDefault>
        </div>
        <div className="cardEmphasis__buttonContainer">
          <ButtonText href={data?.link || "#"}>{item?.link?.title || "Saiba mais"}</ButtonText>
        </div>
      </div>
      <div className="cardEmphasis__imgContainer">
        {item?.image && <ImgDefault className="cardEmphasis__img" src={item?.image?.url} alt={item?.image?.alt} />}
      </div>
    </div>
  );
};

export default CardEmphasis;
