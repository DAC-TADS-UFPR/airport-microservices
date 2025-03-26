import "./CarouselDepoimentos.scss";
import React, { FC } from "react";
import CarouselDefault from "../CarouselDefault/CarouselDefault";
import CarouselSlide from "../CarouselDefault/components/CarouselSlide";
import CardDepoimento from "@/components/Card/CardDepoimento/CardDepoimento";

interface CarouselDepoimentosProps {
  data: any;
}

const CarouselDepoimentos: FC<CarouselDepoimentosProps> = ({ data }) => {
  return (
    <div className="carouselDepoimentos">
      {data?.repeater?.length > 0 && (
        <CarouselDefault options={{ loop: false }}>
          {data?.repeater?.map((item: any, i: number) => (
            <CarouselSlide key={i}>
              <CardDepoimento id={item?.ID ? item.ID : item} />
            </CarouselSlide>
          ))}
        </CarouselDefault>
      )}
    </div>
  );
};

export default CarouselDepoimentos;
