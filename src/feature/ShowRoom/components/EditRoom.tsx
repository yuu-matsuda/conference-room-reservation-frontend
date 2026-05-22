import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import z from "zod";

export const EditRoom = () => {
	const roomSchema = z.object({
		name: z.string().min(1, "部屋名は必須です"),
		capacity: z.number("半角数字で入力して下さい"),
		description: z.string().max(100, "100文字以下で入力してください"),
	});

	type UpdateRoom = z.infer<typeof roomSchema>;
	const location = useLocation();
	const room = location.state;
	const roomId = {
		id: room.id,
	};

	const [message, setMessage] = useState("");
	const [form, setForm] = useState({ name: "", capacity: "", description: "" });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateRoom>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			name: room.name,
			capacity: room.capacity,
			description: room.description,
		},
	});

	const updateRoom = (data: UpdateRoom) => {
		console.log("pointA");
		const payload = Object.assign(roomId, data);
		console.log(payload);
		fetch("http://localhost:5030/api/Room", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then(() => setMessage(`会議室を更新しました。`))
			.catch((err) => setMessage(`エラー：${err}`));
		console.log("pointB");
	};

	const handleChange = (
		type: keyof UpdateRoom,
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setForm({
			...form,
			[type]: e.target.value,
		});
	};

	return (
		<div>
			<p>更新画面</p>
			<form onSubmit={handleSubmit(updateRoom)}>
				<p>会議室名</p>
				<input
					{...register("name")}
					onChange={(e) => {
						handleChange("name", e);
					}}
				/>
				{errors.name && <span>{errors.name.message}</span>}
				<p>人数</p>
				<input
					{...register("capacity", { valueAsNumber: true })}
					onChange={(e) => {
						handleChange("capacity", e);
					}}
				/>
				{errors.capacity && <span>{errors.capacity.message}</span>}
				<p>説明</p>
				<input
					{...register("description")}
					onChange={(e) => {
						handleChange("description", e);
					}}
				/>
				{errors.description && <span>{errors.description.message}</span>}
				<button type="submit">更新</button>
			</form>
			<p>{message}</p>
		</div>
	);
};
