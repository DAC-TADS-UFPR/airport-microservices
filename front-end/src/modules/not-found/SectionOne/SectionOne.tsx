"use client";
import React, { FC } from "react";

type SectionOneProps = {} & React.ComponentProps<"section">;

const SectionOne: FC<SectionOneProps> = () => {
  return (
    <section className="sectionOne">
      <div className="container">
        <div className="block">
          <h1 className="block__status">404</h1>
          <p className="block__message">Oops! Não encontramos a página que você está procurando.</p>
          <button onClick={() => (window.location.href = "/")} title="VOLTAR PARA HOME" name="VOLTAR PARA HOME">
            VOLTAR PARA O DASHBOARD
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
