export type ReservationProperty = {
  id: number;
  roomId: number;
  roomName: string;
  title: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ShowReservationProps = {
  reservations: ReservationProperty[];
};
