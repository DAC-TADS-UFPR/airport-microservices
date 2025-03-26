import "./CarouselProducts.scss";
import React, { FC } from "react";
import CardProduto from "@/components/Card/CardProduto/CardProduto";
import CarouselDefault from "../CarouselDefault/CarouselDefault";
import CarouselSlide from "../CarouselDefault/components/CarouselSlide";

interface CarouselProductsProps {
  // Define your props here if needed
  data: any;
}

const CarouselProducts: FC<CarouselProductsProps> = ({ data }) => {
  return (
    <div className="carouselProducts">
      {data?.length > 0 && (
        <CarouselDefault options={{ loop: false, align: "start" }}>
          {data?.map((item: any, i: number) => (
            <CarouselSlide key={i}>
              <CardProduto data={item} />
            </CarouselSlide>
          ))}
        </CarouselDefault>
      )}
    </div>
  );
};

export default CarouselProducts;
