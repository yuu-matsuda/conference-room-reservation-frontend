import { type ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import type { RoomForm } from "../types";
import { RoomFormPage } from "./RoomFormPage";

export const EditRoom = () => {
  const location = useLocation();
  const room = location.state;

  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", capacity: "", description: "" });

  const updateRoom = (data: RoomForm) => {
    fetch(`http://localhost:5030/api/Room/${room.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => setMessage(`会議室を更新しました。`))
      .catch((err) => setMessage(`エラー：${err}`));
  };

  const handleChange = (type: keyof RoomForm, e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [type]: e.target.value,
    });
  };

  return (
    <div>
      <RoomFormPage formType="edit" room={room} onSubmit={updateRoom} handleChange={handleChange} />
      <p>{message}</p>
    </div>
  );
};
