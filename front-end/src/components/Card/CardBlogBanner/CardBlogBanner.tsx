import CarouselDefault from "@/components/Carousel/CarouselDefault/CarouselDefault";
import CarouselSlide from "@/components/Carousel/CarouselDefault/components/CarouselSlide";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";
import { formatDate } from "@/utils/formatDate";
import React, { FC } from "react";
import "./CardBlogBanner.scss";
import Link from "next/link";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface CardBlogBannerProps {
  data: any;
}

const CardBlogBanner: FC<CardBlogBannerProps> = ({ data }) => {
  return (
    <CarouselDefault>
      {data?.length > 0 &&
        data?.map((item: any, i: number) => (
          <CarouselSlide key={i + "cardBlogBanner"}>
            <LinkDefault className="cardBlogBanner" href={item?.link}>
              <picture className="cardBlogBanner__container">
                <source srcSet={item?.acf?.sectionOne?.banner_mobile?.url} media="(max-width: 768px)" />
                <source srcSet={item?.acf?.sectionOne?.banner_desktop?.url} media="(min-width: 768px)" />
                <ImgDefault
                  className="cardBlogBanner__img"
                  src={item?.acf?.sectionOne?.image_desktop?.url}
                  alt={item?.acf?.sectionOne?.image_desktop?.url}
                />
                <div className="cardBlogBanner__textContainer">
                  <div className="cardBlogBanner__categoryContainer">
                    <div className="cardBlogBanner__category">{item?._embedded?.["wp:term"]?.[0]?.[0]?.name}</div>
                    <div className="cardBlogBanner__date">{formatDate(item?.date)}</div>
                  </div>
                  <h3 className="cardBlogBanner__titleContainer">
                    <TextDefault className="cardBlogBanner__title">{item?.title?.rendered}</TextDefault>
                  </h3>
                  <div className="cardBlogBanner__descriptionContainer">
                    <TextDefault className="cardBlogBanner__description">{item?.excerpt?.rendered}</TextDefault>
                  </div>
                </div>
              </picture>
            </LinkDefault>
          </CarouselSlide>
        ))}
    </CarouselDefault>
  );
};

export default CardBlogBanner;
