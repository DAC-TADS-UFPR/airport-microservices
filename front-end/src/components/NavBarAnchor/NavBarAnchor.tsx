import "./NavBarAnchor.scss";
import React, { FC } from "react";
import Link from "next/link";
import AncorContainer from "./components/AnchorContainer";
import CarouselSlide from "../Carousel/CarouselDefault/components/CarouselSlide";
import CarouselMobile from "../Carousel/CarouselMobile/CarouselMobile";
import LinkDefault from "../LinkDefault/LinkDefault";

interface NavBarAnchorProps {
  data: any;
}

const NavBarAnchor: FC<NavBarAnchorProps> = ({ data }) => {
  const anchors = Object.values(data?.acf)
    .filter((section: any) => section?.anchor?.title)
    .map((section: any) => section?.anchor);
  return (
    <AncorContainer>
      <div className="navBarAnchor__container">
        {anchors?.length > 0 && (
          <CarouselMobile>
            {anchors.map((anchor: any, i: number) => (
              <CarouselSlide key={i + "sectionTwo"}>
                <LinkDefault
                  key={i + "navBarAnchor"}
                  title={`Acessar ${anchor?.title}`}
                  className="navBarAnchor__title navBarAnchor__title--1"
                  href={`#${anchor?.url}`}
                >
                  {anchor?.title}
                </LinkDefault>
              </CarouselSlide>
            ))}
          </CarouselMobile>
        )}
      </div>
    </AncorContainer>
  );
};

export default NavBarAnchor;
