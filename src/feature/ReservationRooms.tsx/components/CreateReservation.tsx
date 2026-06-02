import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { reservationSchema } from "../schema";
import type { ConferenceRooms, CreateReservationRequest, ReservationProperty } from "../types";

type ReservationProps = {
  reservations: ReservationProperty[];
  setReservations: (arg: ReservationProperty[]) => void;
};
export const CreateReservation = (props: ReservationProps) => {
  const [message, setMessage] = useState<string>();
  const [conferenceRooms, setConferenceRooms] = useState<ConferenceRooms>([]);

  const onSubmit = (data: CreateReservationRequest) => {
    const jsonString = JSON.stringify(data);
    fetch("http://localhost:5030/api/Reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    })
      .then(async (res) => {
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message ?? "予約に失敗しました。");
        }
        return responseData;
      })
      .then((reservation) => {
        props.setReservations([...props.reservations, reservation]);
        setMessage("会議室を予約しました。");
      })
      .catch((err) => setMessage(`エラー：${err.message}`));
  };

  useEffect(() => {
    fetch("http://localhost:5030/api/Room", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setConferenceRooms(data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReservationRequest>({
    resolver: zodResolver(reservationSchema),
  });

  return (
    <div className="flex w-full max-w-lg flex-col rounded-xl bg-white shadow-lg">
      <div className="m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>会議室</p>
          <select
            className="h-8 rounded-sm border border-slate-300 bg-white px-3 text-sm"
            {...register("roomId", { valueAsNumber: true })}
          >
            <option value="">選択してください</option>
            {conferenceRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          {errors.roomId && <span>{errors.roomId.message}</span>}
          <p>予約名</p>
          <input
            className="mb-2 h-8 rounded-sm border border-slate-300 px-3 text-sm"
            {...register("title")}
          />
          {errors.title && <span>{errors.title.message}</span>}
          <p>開始日時</p>
          <input
            type="datetime-local"
            className="mb-2 h-8 rounded-sm border border-slate-300 px-3 text-sm"
            aria-invalid={errors.startAt ? "true" : "false"}
            {...register("startAt")}
          />
          {errors.startAt && <span>{errors.startAt.message}</span>}
          <p>終了日時</p>
          <input
            type="datetime-local"
            className="mb-2 h-8 rounded-sm border border-slate-300 px-3 text-sm"
            aria-invalid={errors.startAt ? "true" : "false"}
            {...register("endAt")}
          />
          {errors.endAt && <span>{errors.endAt.message}</span>}
          <Button name="予約する" type="submit" colorType="primary" />
        </form>
      </div>
      {message}
    </div>
  );
};
