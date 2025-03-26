import ImgDefault from "@/components/ImgDefault/ImgDefault";
import React, { FC } from "react";
import "./CardBlog.scss";
import TextDefault from "@/components/TextDefault/TextDefault";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface CardBlogProps {
  post: any;
}

const CardBlog: FC<CardBlogProps> = ({ post }) => {
  return (
    <LinkDefault href={post?.link} title={post?.title?.rendered}>
      <div className="cardBlog">
        <div className="cardBlog__container">
          <figure className="cardBlog__imgContainer">
            <ImgDefault
              className="cardBlog__imgEmphasis"
              src={post?.acf?.sectionOne?.image_desktop?.url}
              alt={post?.acf?.sectionOne?.image_desktop?.alt}
            />
          </figure>
          <div className="cardBlog__textContainer">
            <h2 className="cardBlog__title">
              <TextDefault>{post?.title?.rendered}</TextDefault>
            </h2>
            <div className="cardBlog__buttonContainer">
              <div className="cardBlog__category">{post?._embedded?.["wp:term"]?.[0]?.[0]?.name}</div>
              <div className="cardBlog__date">{formatDate(post?.date)}</div>
            </div>
          </div>
        </div>
      </div>
    </LinkDefault>
  );
};

export default CardBlog;
