"use client";
import "./page.scss";
import { useState } from "react";
import MainDefault from "@/components/Main/Main";
import UserMilesCard from "@/modules/User/UserMilesCard/UserMilesCard";
import UserHistoryCard from "@/modules/User/UserHistoryCard/UserHistoryCard";
import UserReservations from "@/modules/User/UserReservations/UserReservations";
import UserHistory from "@/modules/User/UserHistory/UserHistory";
import AvailableFlights from "@/modules/User/AvailableFlights/AvailableFlights";

export default function Page() {
  const [navbar, setNavbar] = useState("reservas");

  return (
    <MainDefault id="user">
      <section className="user">
        <div className="user__infoContainer">
          <UserMilesCard />
          <div className="user__infoContainer user__infoContainer--row">
            <UserHistoryCard info="Earned" />
            <UserHistoryCard info="Used" />
          </div>
        </div>
        <div className="user__navigation">
          <div className="user__navbar">
            <div className={`user__navbarButton ${navbar === "reservas" && "user__navbarButton--active"}`} onClick={() => setNavbar("reservas")}>
              Minhas reservas
            </div>
            <div className={`user__navbarButton ${navbar === "voos" && "user__navbarButton--active"}`} onClick={() => setNavbar("voos")}>
              Voos disponíveis
            </div>
            <div className={`user__navbarButton ${navbar === "historico" && "user__navbarButton--active"}`} onClick={() => setNavbar("historico")}>
              Histórico
            </div>
          </div>

          {navbar === "voos" ? <AvailableFlights /> : navbar === "historico" ? <UserHistory /> : <UserReservations />}
        </div>
      </section>
    </MainDefault>
  );
}
