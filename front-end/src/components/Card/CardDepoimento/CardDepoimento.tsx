import React, { FC } from "react";
import "./CardDepoimento.scss";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import getItem from "@/data/lib/getItem";
import TextDefault from "@/components/TextDefault/TextDefault";
import VideoClickPlay from "@/components/Video/VideoClickPlay/VideoClickPlay";
type CardDepoimentoProps = {
  id: any;
} & React.ComponentProps<"div">;

const CardDepoimento: FC<CardDepoimentoProps> = async ({ id }) => {
  const data = await getItem(id, "depoimento", "sectionOne");

  return (
    <div className="cardDepoimento">
      <div className="cardDepoimento__container">
        <div className="cardDepoimento__videoContainer">
          {data?.video_check ? (
            <VideoClickPlay video={data?.video} poster={data?.poster} />
          ) : (
            <figure className="cardDepoimento__imgContainer">
              <ImgDefault className="cardDepoimento__imgEmphasis" src={data?.image?.url} alt={data?.image?.alt} />
            </figure>
          )}
        </div>
        <div className="cardDepoimento__textContainer">
          <div className="cardDepoimento__titleContainer">
            <h2 className="cardDepoimento__title  cardDepoimento__title--font">
              <span>Nome:</span>
              <TextDefault>{data?.name}</TextDefault>
            </h2>
          </div>
          <div className="cardDepoimento__titleContainer">
            <h3 className="cardDepoimento__title ">
              <span>Empresa:</span>
              <TextDefault>{data?.company}</TextDefault>
            </h3>
          </div>
          <div className="cardDepoimento__titleContainer">
            <h3 className="cardDepoimento__title ">
              <span>Cargo:</span>
              <TextDefault>{data?.office}</TextDefault>
            </h3>
          </div>
          <div className="cardDepoimento__titleContainer">
            <h3 className="cardDepoimento__title ">
              <span>Área de atuação:</span>
              <TextDefault>{data?.occupation}</TextDefault>
            </h3>
          </div>
          <div className="cardDepoimento__descriptionContainer">
            <TextDefault className=" cardDepoimento__description">{data?.description}</TextDefault>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDepoimento;
