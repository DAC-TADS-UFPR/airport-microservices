import ImgDefault from "@/components/ImgDefault/ImgDefault";
import getItem from "@/data/lib/getItem";
import React, { FC } from "react";
import "./CardClientes.scss";
interface CardClientesProps {
  id: string;
}

const CardClientes: FC<CardClientesProps> = async ({ id }) => {
  const data = await getItem(id, "clientes", "sectionOne");
  return (
    <>
      <div className="cardClientes">
        <figure className="cardClientes__imgContainer">
          <ImgDefault className="cardClientes__imgEmphasis" src={data?.image?.url} alt={data?.image?.alt} />
        </figure>
      </div>
    </>
  );
};

export default CardClientes;
