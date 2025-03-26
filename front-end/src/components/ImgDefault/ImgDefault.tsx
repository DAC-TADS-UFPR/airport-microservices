"use client";
import "./ImgDefault.scss";
import { FC, useState } from "react";
import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {}

const ImgDefault: FC<Props> = ({ className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`imgDefault ${className}`}>
      <div
        className={`imgDefault__skeleton ${
          isLoaded ? "imgDefault__skeleton--imgLoaded" : ""
        } ${className}`}
        {...props}
      />
      <Image
        width={0}
        height={0}
        sizes="100vw"
        quality={100}
        priority
        className={`imgDefault__img ${className} ${
          isLoaded ? "imgDefault__img--imgLoaded" : ""
        }`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default ImgDefault;
