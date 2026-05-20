import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ShowRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5030/api/Room", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div>
      <div>
        <p>会議室一覧ページです</p>
        <button type="button" className="border border-red py-2 px-4">
          <Link to="/create">作成画面に遷移</Link>
        </button>
      </div>
      <div>
        <p>会議室詳細</p>
        <table>
          <tr>
            <th>チェックボックス</th>
            <th>会議室ID</th>
            <th>部屋名</th>
            <th>人数</th>
            <th>説明</th>
          </tr>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.description}</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <button type="button" className="border m-2">
          更新
        </button>
        <button type="button" className="border m-2">
          削除
        </button>
      </div>
    </div>
  );
};
