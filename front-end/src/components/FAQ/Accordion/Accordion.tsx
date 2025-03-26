"use client";

import "./Accordion.scss";
import React, { FC, useEffect, useRef, useState } from "react";
import TextDefault from "@/components/TextDefault/TextDefault";
import useClickOutside from "@/hooks/useClickOutside";

interface AccordionProps {
  data: any;
}

const Accordion: FC<AccordionProps> = ({ data }) => {
  const [active, setActive, ref] = useClickOutside();

  return (
    <div ref={ref} className={`accordion ${active ? "accordion--active" : ""}`}>
      <div
        className="accordion__container"
        onClick={() => setActive((prev) => !prev)}
      >
        <div className="accordion__title">
          <TextDefault>{data?.title}</TextDefault>
        </div>
        <span
          className={`accordion__icon ${
            active ? "accordion__icon--active" : ""
          }`}
        />
      </div>
      <div
        className={`accordion__descriptionContainer ${
          active ? "accordion__descriptionContainer--active" : ""
        }`}
      >
        <TextDefault className="accordion__description">
          {data?.description}
        </TextDefault>
      </div>
    </div>
  );
};

export default Accordion;
