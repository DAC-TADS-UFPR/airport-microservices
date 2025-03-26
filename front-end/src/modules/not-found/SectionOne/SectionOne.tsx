import React, { FC } from "react";
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

type SectionOneProps = {} & React.ComponentProps<"section">;

const SectionOne: FC<SectionOneProps> = () => {
  return (
    <section className="sectionOne">
      <BreadCrumb data={[{ name: "Página não encontrada", url: "#" }]} />
      <div className="container">
        <div className="block">
          <h1 className="block__status">404</h1>
          <p className="block__message">
            Oops! Não encontramos a página que você está procurando.
          </p>
          <ButtonDefault
            data={{
              url: "/",
              title: "VOLTAR PARA HOME",
              name: "VOLTAR PARA HOME",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
