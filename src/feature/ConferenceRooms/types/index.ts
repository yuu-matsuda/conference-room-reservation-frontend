import type z from "zod";
import type { roomSchema } from "../schema";

export type RoomForm = z.infer<typeof roomSchema>;
