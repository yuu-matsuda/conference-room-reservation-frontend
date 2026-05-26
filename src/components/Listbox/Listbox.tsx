import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

type RoomList = {
  id: number;
  name: string;
};

type Data = {
  roomList: { id: number; name: string }[];
  selectedRoom: RoomList;
  setSelectedRoom: (room: RoomList) => void;
};

export const ListboxSelect = (data: Data) => {
  return (
    <div>
      <Listbox value={data.selectedRoom} onChange={data.setSelectedRoom}>
        <ListboxButton className="rounded-sm border">{data.selectedRoom.name}</ListboxButton>
        <ListboxOptions anchor="bottom" className="border">
          {data.roomList.map((room) => (
            <ListboxOption
              key={room.id}
              value={room}
              className="group flex gap-2 bg-white data-focus:bg-blue-100"
            >
              {room.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
