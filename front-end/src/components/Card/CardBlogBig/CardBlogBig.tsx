import ImgDefault from "@/components/ImgDefault/ImgDefault";
import React, { FC } from "react";
import "./CardBlogBig.scss";
import TextDefault from "@/components/TextDefault/TextDefault";
import { formatDate } from "@/utils/formatDate";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface CardBlogBigProps {
  post: any;
}

const CardBlogBig: FC<CardBlogBigProps> = ({ post }) => {
  return (
    <LinkDefault href={post?.link} title={post?.title?.rendered}>
      <div className="cardBlogBig">
        <div className="cardBlogBig__container">
          <div className="cardBlogBig__item cardBlogBig__item--1">
            <figure className="cardBlogBig__imgContainer">
              <ImgDefault
                className="cardBlogBig__imgEmphasis"
                src={post?.acf?.sectionOne?.image_desktop?.url}
                alt={post?.acf?.sectionOne?.image_desktop?.alt}
              />
            </figure>
          </div>
          <div className="cardBlogBig__item cardBlogBig__item--2">
            <h2 className="cardBlogBig__title cardBlogBig__title--1">
              <TextDefault>{post?.title?.rendered}</TextDefault>
            </h2>
            <h3 className="cardBlogBig__title cardBlogBig__title--2">
              <TextDefault>{post?.acf?.sectionOne?.subtitle}</TextDefault>
            </h3>
            <h4 className="cardBlogBig__title cardBlogBig__title--3">
              <TextDefault>{post?.acf?.sectionOne?.description}</TextDefault>
            </h4>
            <div className="cardBlogBig__btn">
              <div className="cardBlogBig__btn cardBlogBig__btn--1">{post?._embedded?.["wp:term"]?.[0]?.[0]?.name}</div>
              <div className="cardBlogBig__btn cardBlogBig__btn--2">{formatDate(post?.date)}</div>
            </div>
          </div>
        </div>
      </div>
    </LinkDefault>
  );
};

export default CardBlogBig;
