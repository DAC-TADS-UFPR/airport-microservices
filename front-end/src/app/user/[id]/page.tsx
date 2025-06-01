"use client";
import "./page.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCliente } from "@/data/config/client";
import { useParams, useRouter } from "next/navigation";
import MainDefault from "@/components/Main/Main";
import UserHistory from "@/modules/User/UserHistory/UserHistory";
import UserMilesCard from "@/modules/User/UserMilesCard/UserMilesCard";
import UserHistoryCard from "@/modules/User/UserHistoryCard/UserHistoryCard";
import UserReservations from "@/modules/User/UserReservations/UserReservations";
import AvailableFlights from "@/modules/User/AvailableFlights/AvailableFlights";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const cleanupLocalStorage = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("accessToken");
  };

  const storedId = localStorage.getItem("userId");
  const storedRole = localStorage.getItem("tipo");
  const accessToken = localStorage.getItem("access_token");

  if (!storedId || !storedRole || !accessToken) {
    cleanupLocalStorage();
    return router.replace("/");
  }
  if (storedRole !== "CLIENTE" || storedId !== id) {
    return router.back();
  }

  const [navbar, setNavbar] = useState("reservas");

  const { data, isLoading } = useQuery({
    queryKey: [`cliente-${id}`, id],
    queryFn: getCliente,

    refetchOnWindowFocus: false,
  });

  // console.log(data);

  return (
    <MainDefault id="user">
      <section className="user">
        <div className="user__infoContainer">
          <UserMilesCard data={data?.saldo_milhas}/>
          <div className="user__infoContainer user__infoContainer--row">
            <UserHistoryCard info="Earned" />
            <UserHistoryCard info="Used" />
          </div>
        </div>
        <div className="user__navigation">
          <div className="user__navbar">
            <div
              className={`user__navbarButton ${
                navbar === "reservas" && "user__navbarButton--active"
              }`}
              onClick={() => setNavbar("reservas")}
            >
              Minhas reservas
            </div>
            <div
              className={`user__navbarButton ${
                navbar === "voos" && "user__navbarButton--active"
              }`}
              onClick={() => setNavbar("voos")}
            >
              Voos disponíveis
            </div>
            <div
              className={`user__navbarButton ${
                navbar === "historico" && "user__navbarButton--active"
              }`}
              onClick={() => setNavbar("historico")}
            >
              Histórico
            </div>
          </div>

          {navbar === "voos" ? (
            <AvailableFlights />
          ) : navbar === "historico" ? (
            <UserHistory />
          ) : (
            <UserReservations />
          )}
        </div>
      </section>
    </MainDefault>
  );
}
