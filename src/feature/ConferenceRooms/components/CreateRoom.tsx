import { useState } from "react";
import type { RoomForm } from "../types";
import { RoomFormPage } from "./RoomFormPage";

export const CreateRoom = () => {
  const [message, setMessage] = useState("");

  const onSubmit = (data: RoomForm) => {
    const jsonString = JSON.stringify(data);
    fetch("http://localhost:5030/api/Room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    })
      .then((res) => res.json())
      .then((data) => setMessage(`${data.name} を新しく登録しました。`))
      .catch((err) => setMessage(`エラー：${err}`));
  };

  return (
    <div>
      <RoomFormPage formType="create" onSubmit={onSubmit} />
      {message}
    </div>
  );
};
