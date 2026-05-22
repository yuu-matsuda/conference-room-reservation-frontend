import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button/Button";

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
			<div>
				<p>会議室一覧ページです</p>
				<button type="button" className="border py-2 px-4">
					<Link to="/create">作成画面に遷移</Link>
				</button>
			</div>
			<div>
				<p>会議室詳細</p>
				<table className="container">
					<thead className="border bg-slate-50">
						<tr>
							<th>部屋名</th>
							<th>人数</th>
							<th>説明</th>
							<th colSpan={2}>操作</th>
						</tr>
					</thead>
					<tbody className="text-red">
						{rooms.map((room) => (
							<tr className="border" key={room.id}>
								<td>{room.name}</td>
								<td>{room.capacity}</td>
								<td>{room.description}</td>
								<td>
									<button
										type="button"
										onClick={() => {
											navigate(`/${room.id}`, { state: room });
										}}
										className="border m-2"
									>
										更新
									</button>
								</td>
								<td>
									<button
										type="button"
										className="border m-2"
										onClick={() => {
											deleteDialog(room.id);
										}}
									>
										削除
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50"
			>
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
						<p>この会議室を削除しますか？</p>
						<div className="flex gap-4">
							<Button
								name="削除"
								type="button"
								colorType="danger"
								onClick={deleteRoom}
							></Button>
							<Button
								name="閉じる"
								type="button"
								colorType="normal"
								onClick={() => setIsOpen(false)}
							></Button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
			{message}
		</div>
	);
};
