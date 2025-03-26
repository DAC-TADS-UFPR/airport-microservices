import React, { FC } from "react";

interface CarouselSlideProps {
  children: React.ReactNode;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ children }) => {
  return <div className={`carouselDefault__slide `}>{children}</div>;
};

export default CarouselSlide;
