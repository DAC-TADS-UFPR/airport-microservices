import React, { FC, ReactNode } from "react";
import CarouselDefault from "../CarouselDefault/CarouselDefault";
import { EmblaOptionsType } from "embla-carousel";
import { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import "./CarouselMobile.scss";

interface CarouselMobileProps {
  options?: EmblaOptionsType;
  plugins?: React.ReactNode;
  activeSlide?: boolean;
  autoScroll?: boolean;
  autoScrollOptions?: AutoScrollOptionsType;
  children: React.ReactNode;
}

const CarouselMobile: FC<CarouselMobileProps> = ({ children, options, ...props }) => {
  return (
    <div className="carouselMobile">
      <CarouselDefault
        options={{
          active: false,
          breakpoints: {
            "(max-width: 768px)": { active: true, loop: false, align: "center", dragFree: true }
          },
          ...options
        }}
        {...props}
      >
        {children}
      </CarouselDefault>
    </div>
  );
};

export default CarouselMobile;
