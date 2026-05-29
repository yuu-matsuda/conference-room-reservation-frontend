import { useEffect, useState } from "react";
import { CreateReservation } from "../feature/ReservationRooms.tsx/components/CreateReservation";
import { ShowReservation } from "../feature/ReservationRooms.tsx/components/ShowReservations";

export const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5030/api/Reservation", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReservations(data));
  }, []);

  return (
    <div className="flex justify-center gap-2 pt-2">
      <CreateReservation reservations={reservations} setReservations={setReservations} />
      <ShowReservation reservations={reservations} setReservations={setReservations} />
    </div>
  );
};
