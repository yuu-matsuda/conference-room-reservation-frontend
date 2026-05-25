import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { DeleteRoomDialog } from "../feature/ConferenceRooms/components/DeleteRoomDialog";

export const ShowRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState<number>();
  const [message, setMessage] = useState<string>();

  const deleteDialog = (roomId: number) => {
    setRoomId(roomId);
    setIsOpen(true);
  };

  useEffect(() => {
    fetch("http://localhost:5030/api/Room", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  const deleteRoom = () => {
    fetch(`http://localhost:5030/api/Room/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => setRooms(rooms.filter((room) => room.id !== roomId)))
      .then(() => setMessage(`会議室を削除しました。`))
      .catch((err) => setMessage(`エラー：${err}`));
    setIsOpen(false);
  };

  return (
    <div>
      <p className="m-2 flex justify-center pt-4 text-2xl">会議室一覧ページです</p>
      <div className="mx-auto flex w-full max-w-5xl justify-end px-6">
        <button type="button" className="mb-2 rounded-md border bg-green-600 px-4 py-2 text-white">
          <Link to="/create">会議室を追加</Link>
        </button>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6">
        <table className="w-full table-fixed border-collapse">
          <thead className="border bg-white">
            <tr>
              <th className="px-6 py-3 text-left">会議室名</th>
              <th className="px-6 py-3 text-left">定員</th>
              <th className="px-6 py-3 text-left">説明</th>
              <th className="px-6 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr className="border bg-white" key={room.id}>
                <td className="px-6 py-3 text-left">{room.name}</td>
                <td className="px-6 py-3 text-left">{room.capacity}</td>
                <td className="px-6 py-3 text-left">{room.description}</td>
                <td className="flex gap-2 px-6 py-2">
                  <Button
                    name="更新"
                    type="button"
                    colorType="primary"
                    onClick={() => {
                      navigate(`/${room.id}`, { state: room });
                    }}
                  />
                  <Button
                    name="削除"
                    type="button"
                    colorType="danger"
                    onClick={() => {
                      deleteDialog(room.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteRoomDialog
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        deleteRoom={() => {
          deleteRoom();
        }}
      ></DeleteRoomDialog>
      {message}
    </div>
  );
};
