"use client";
import "./page.scss";
import { useState } from "react";
import MainDefault from "@/components/Main/Main";
import NextFlights from "@/modules/Admin/NextFlights/NextFlights";
import ManageStaff from "@/modules/Admin/ManageStaff/ManageStaff";
import ManageFlights from "@/modules/Admin/ManageFlights/ManageFlights";

export default function Page() {
  const [navbar, setNavbar] = useState("proximos");

  return (
    <MainDefault id="admin">
      <section className="admin">
        <div className="admin__navbar">
          <div className={`admin__navbarButton ${navbar === "proximos" && "admin__navbarButton--active"}`} onClick={() => setNavbar("proximos")}>
            Próximos voos
          </div>
          <div className={`admin__navbarButton ${navbar === "gerenciar" && "admin__navbarButton--active"}`} onClick={() => setNavbar("gerenciar")}>
            Gerenciar voos
          </div>
          <div className={`admin__navbarButton ${navbar === "equipe" && "admin__navbarButton--active"}`} onClick={() => setNavbar("equipe")}>
            Gerenciar equipe
          </div>
        </div>
        {navbar === "gerenciar" ? <ManageFlights /> : navbar === "equipe" ? <ManageStaff /> : <NextFlights />}
      </section>
    </MainDefault>
  );
}
