"use client";

import { FC, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReservationCard from "../ReservationCard/ReservationCard";
import { getReservationsByClient } from "@/data/config/reservation";
import { ReservationDTO } from "@/models/reserva";
import "./UserReservations.scss";
import { ReservaStateEnum } from "@/models/reserva.state";

type Status = "Next" | "Completed" | "Canceled";

const UserReservations: FC = () => {
  const { id } = useParams();
  const [navbar, setNavbar] = useState<Status>("Next");
  const now = useMemo(() => new Date(), []);

  const {
    data: reservations,
    isLoading,
    isError,
  } = useQuery<ReservationDTO[], Error>({
    queryKey: ["reservas-cliente", id],
    queryFn: getReservationsByClient,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const filteredReservations = useMemo(() => {
    if (!reservations) return [];

    return reservations.filter((reserva) => {
      if (
        reserva.estado === ReservaStateEnum.CANCELADA || reserva.estado === ReservaStateEnum.CANCELADA_VOO
      ) {
        return navbar === "Canceled";
      }

      const vooDate = new Date(reserva.voo.data);
      if (reserva.estado !== ReservaStateEnum.REALIZADA && navbar === "Next") {
        return true;
      }
      if (reserva.estado === ReservaStateEnum.REALIZADA && navbar === "Completed") {
        return true;
      }
      return false;
    });
  }, [reservations, navbar, now]);

  if (isLoading) {
    return <p className="userReservations__status">Carregando reservas...</p>;
  }
  if (isError) {
    return (
      <p className="userReservations__status">
        Erro ao carregar reservas. Tente novamente mais tarde.
      </p>
    );
  }

  return (
    <div className="userReservations">
      <div className="userReservations__title">Minhas reservas</div>

      <div className="userReservations__navigation">
        <div className="userReservations__navbar">
          <div
            className={`userReservations__navbarButton ${
              navbar === "Next" && "userReservations__navbarButton--active"
            }`}
            onClick={() => setNavbar("Next")}
          >
            Próximas
          </div>
          <div
            className={`userReservations__navbarButton ${
              navbar === "Completed" && "userReservations__navbarButton--active"
            }`}
            onClick={() => setNavbar("Completed")}
          >
            Completas
          </div>
          <div
            className={`userReservations__navbarButton ${
              navbar === "Canceled" && "userReservations__navbarButton--active"
            }`}
            onClick={() => setNavbar("Canceled")}
          >
            Canceladas
          </div>
        </div>
      </div>

      <div className="userReservations__content">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reserva) => {
            let status: Status;
            if (
              reserva.estado === ReservaStateEnum.CANCELADA || reserva.estado === ReservaStateEnum.CANCELADA_VOO
            ) {
              status = "Canceled";
            } else {
              const vooDate = new Date(reserva.voo.data);
              status = reserva.estado !== ReservaStateEnum.REALIZADA ? "Next" : "Completed";
            }
            
            return (
              <ReservationCard
                key={reserva.codigo}
                data={reserva}
                status={status}
              />
            );
          })
        ) : (
          <p className="userReservations__empty">
            Nenhuma reserva nesta categoria.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserReservations;
