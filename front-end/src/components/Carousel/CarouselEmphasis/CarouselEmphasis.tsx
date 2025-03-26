import "./CarouselEmphasis.scss";
import React, { FC } from "react";
import CarouselDefault from "../CarouselDefault/CarouselDefault";
import CarouselSlide from "../CarouselDefault/components/CarouselSlide";
import CardEmphasis from "@/components/Card/CardEmphasis/CardEmphasis";

interface CarouselEmphasisProps {
  // Define your props here if needed
  data: any;
  slug: string;
}

const CarouselEmphasis: FC<CarouselEmphasisProps> = ({ data, slug }) => {
  const item = data?.repeater?.length > 0 ? data?.repeater : data;
  return (
    <div className="carouselEmphasis">
      {item?.length > 0 && (
        <CarouselDefault options={{ loop: false }} activeSlide>
          {item.map((item: any, i: number) => (
            <CarouselSlide key={i}>
              <CardEmphasis data={item} slug={slug} />
            </CarouselSlide>
          ))}
        </CarouselDefault>
      )}
    </div>
  );
};

export default CarouselEmphasis;
