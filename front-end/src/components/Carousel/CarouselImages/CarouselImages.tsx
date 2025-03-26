import "./CarouselImages.scss";
import React, { FC } from "react";
import CarouselDefault from "../CarouselDefault/CarouselDefault";
import CarouselSlide from "../CarouselDefault/components/CarouselSlide";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

interface CarouselImagesProps {
  // Define your props here if needed
  data: any;
}

const CarouselImages: FC<CarouselImagesProps> = ({ data }) => {
  return (
    <div className="carouselImages">
      {data?.gallery && (
        <CarouselDefault options={{ loop: false, align: "start" }}>
          {data?.gallery.map((image: any, i: number) => (
            <CarouselSlide key={i}>
              <figure className="carouselImages__imgContainer">
                <ImgDefault
                  className="carouselImages__imgEmphasis"
                  src={image?.url}
                  alt={image?.alt}
                />
                <figcaption className="carouselImages__textfigureContainer">
                  <h6 className="carouselImages__textfigure">
                    {image?.title ? image?.title : image?.alt}
                  </h6>
                </figcaption>
              </figure>
            </CarouselSlide>
          ))}
        </CarouselDefault>
      )}
    </div>
  );
};

export default CarouselImages;
