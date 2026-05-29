import z from "zod";

export const reservationSchema = z.object({
  roomId: z.number().min(1, "会議室は必須です"),
  title: z.string().min(1, "予約名は必須です"),
  startAt: z.string().min(1, "時間を選択してください"),
  endAt: z.string().min(1, "時間を選択してください"),
});
