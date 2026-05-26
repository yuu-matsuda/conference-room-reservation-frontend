import { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { ListboxSelect } from "../../../components/Listbox/Listbox";
import TimeSelect from "../../../components/TimeSelect/TimeSelect";

export const CreateReservation = () => {
  const roomList = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];

  const [selectedRoom, setSelectedRoom] = useState(roomList[0]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="flex w-full max-w-lg flex-col rounded-xl bg-white shadow-lg">
      <div className="m-4">
        <form>
          <p>会議室</p>
          <ListboxSelect
            roomList={roomList}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
          <p>予約名</p>
          <input className="border" />
          <p>開始日時</p>
          <TimeSelect
            startHour={9}
            endHour={21}
            stepMinutes={5}
            onChange={(time) => console.log("選択された時間:", time)}
          />
          <p>終了日時</p>
          <TimeSelect
            startHour={9}
            endHour={21}
            stepMinutes={5}
            onChange={(time) => console.log("選択された時間:", time)}
          />
          <Button name="予約する" type="submit" colorType="primary" />
        </form>
      </div>
    </div>
  );
};
