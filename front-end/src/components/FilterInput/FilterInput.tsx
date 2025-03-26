"use client";
import "./FilterInput.scss";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import useHash from "@/hooks/useHash";
import TextDefault from "../TextDefault/TextDefault";

interface FilterInputProps {
  data: any;
}

const FilterInput: FC<FilterInputProps> = ({ data }) => {
  const hash = useHash();
  const router = useRouter();

  return (
    <div className={`filter ${data?.length > 0 ? "" : "filter--nocategory"}`}>
      <label htmlFor="filterCategory" className="filter__text">
        Filtrar por:
      </label>
      <div className="filter__selectWrap">
        <select
          value={hash ?? ""}
          name="filter"
          id="filterCategory"
          className="filter__select"
          onChange={(e) => {
            return router.push("#" + e?.currentTarget?.value, {
              scroll: false,
            });
          }}
        >
          <option value="">Selecione uma categoria</option>
          {data?.length > 0 &&
            data?.map((item: any, i: number) => (
              <option
                value={item?.slug}
                key={item?.slug + "selectfilter"}
                dangerouslySetInnerHTML={{ __html: item?.name || "" }}
              />
            ))}
        </select>
      </div>
    </div>
  );
};

export default FilterInput;
