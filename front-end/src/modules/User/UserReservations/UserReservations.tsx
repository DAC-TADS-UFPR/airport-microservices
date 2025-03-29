import ReservationCard from "../ReservationCard/ReservationCard";
import "./UserReservations.scss";
import { FC, useState } from "react";

interface UserReservationsProps {
  data?: any;
}

const UserReservations: FC<UserReservationsProps> = ({ data }) => {
  const [navbar, setNavbar] = useState("Next");

  return (
    <div className="userReservations">
      <div className="userReservations__title">Minhas reservas</div>
      <div className="userReservations__navigation">
        <div className="userReservations__navbar">
          <div className={`userReservations__navbarButton ${navbar === "Next" && "userReservations__navbarButton--active"}`} onClick={() => setNavbar("Next")}>
            Próximas
          </div>
          <div
            className={`userReservations__navbarButton ${navbar === "Completed" && "userReservations__navbarButton--active"}`}
            onClick={() => setNavbar("Completed")}
          >
            Completas
          </div>
          <div
            className={`userReservations__navbarButton ${navbar === "Canceled" && "userReservations__navbarButton--active"}`}
            onClick={() => setNavbar("Canceled")}
          >
            Canceladas
          </div>
        </div>
      </div>

      <div className="userReservations__content">
        {navbar === "Next" && <ReservationCard status={navbar} />}
        {navbar === "Completed" && <ReservationCard status={navbar} />}
        {navbar === "Canceled" && <ReservationCard status={navbar} />}
      </div>
    </div>
  );
};

export default UserReservations;
