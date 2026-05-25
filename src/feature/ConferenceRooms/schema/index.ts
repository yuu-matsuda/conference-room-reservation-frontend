import z from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "部屋名は必須です"),
  capacity: z.number("半角数字で入力して下さい"),
  description: z.string().max(100, "100文字以下で入力してください"),
});
