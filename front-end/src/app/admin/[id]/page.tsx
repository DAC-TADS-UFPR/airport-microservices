"use client";
import "./page.scss";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainDefault from "@/components/Main/Main";
import NextFlights from "@/modules/Admin/NextFlights/NextFlights";
import ManageStaff from "@/modules/Admin/ManageStaff/ManageStaff";
import ManageFlights from "@/modules/Admin/ManageFlights/ManageFlights";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const cleanupLocalStorage = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("tipo");
    localStorage.removeItem("access_token");
  };

  const storedId = localStorage.getItem("userId");
  const storedRole = localStorage.getItem("tipo");
  const accessToken = localStorage.getItem("access_token");

  if (!storedId || !storedRole || !accessToken) {
    cleanupLocalStorage();
    return router.replace("/");
  }
  if (storedRole !== "FUNCIONARIO" || storedId !== id) {
    return router.back();
  }

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
