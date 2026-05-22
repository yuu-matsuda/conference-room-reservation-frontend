import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

export const CreateRoom = () => {
	const roomSchema = z.object({
		name: z.string().min(1, "部屋名は必須です"),
		capacity: z.number("半角数字で入力して下さい"),
		description: z.string().max(100, "100文字以下で入力してください"),
	});
	type RoomForm = z.infer<typeof roomSchema>;

	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RoomForm>({ resolver: zodResolver(roomSchema) });

	const onSubmit = (data: RoomForm) => {
		const jsonString = JSON.stringify(data);
		console.log(jsonString);
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

	console.log(errors);

	return (
		<div>
			<p>会議室作成ページです</p>
			<button type="button" className="py-2 px-4 border">
				<Link to="/">一覧画面に遷移</Link>
			</button>
			<p>会議室を作成します</p>
			<form className="Flex Flex-col" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input {...register("name")} placeholder="会議室名" />
					{errors.name && <span>{errors.name.message}</span>}
				</div>
				<div>
					<input
						{...register("capacity", { valueAsNumber: true })}
						placeholder="人数"
					/>
					{errors.capacity && <span>{errors.capacity.message}</span>}
				</div>
				<div>
					<input {...register("description")} placeholder="説明" />
					{errors.description && <span>{errors.description.message}</span>}
				</div>
				<button type="submit">作成</button>
			</form>
			<p>{message}</p>
		</div>
	);
};
