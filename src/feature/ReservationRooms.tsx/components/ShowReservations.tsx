import { Button } from "../../../components/Button/Button";
import type { ShowReservationProps } from "../types";

export const ShowReservation = ({ reservations }: ShowReservationProps) => {
  return (
    <div>
      <table className="w-auto table-fixed border-collapse">
        <thead className="border bg-white">
          <tr>
            <th className="px-6 py-3 text-left">予約名</th>
            <th className="px-6 py-3 text-left">会議室</th>
            <th className="px-6 py-3 text-left">開始</th>
            <th className="px-6 py-3 text-left">終了</th>
            <th className="px-6 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr className="border bg-white" key={reservation.id}>
              <td className="px-6 py-3 text-left">{reservation.title}</td>
              <td className="px-6 py-3 text-left">{reservation.roomName}</td>
              <td className="px-6 py-3 text-left">{reservation.startAt}</td>
              <td className="px-6 py-3 text-left">{reservation.endAt}</td>
              <td className="flex gap-2 px-6 py-2">
                <Button name="削除" type="button" colorType="danger"></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
