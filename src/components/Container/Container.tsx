import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const Container = () => {
	const roomSchema = z.object({
		name: z.string().min(1, "部屋名は必須です"),
		capacity: z.number("半角数字で入力して下さい"),
		description: z.string().max(100, "100文字以下で入力してください"),
	});

	type RoomForm = z.infer<typeof roomSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RoomForm>({ resolver: zodResolver(roomSchema) });

	const onSubmit = () => {};

	return (
		<div>
			<div>
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
			</div>
		</div>
	);
};
