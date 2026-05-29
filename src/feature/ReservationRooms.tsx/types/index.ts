import type z from "zod";
import type { reservationSchema } from "../schema";

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

export type ConferenceRooms = {
  id: number;
  name: string;
  capacity: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CreateReservationRequest = z.infer<typeof reservationSchema>;
