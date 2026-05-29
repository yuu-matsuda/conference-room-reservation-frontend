import { zodResolver } from "@hookform/resolvers/zod";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { roomSchema } from "../schema";
import type { RoomForm } from "../types";

type EditRoomData = {
  id: string;
  name: string;
  capacity: number;
  description: string;
};

type FormSettings = {
  formType: string;
  room?: EditRoomData;
  onSubmit: (form: RoomForm) => void;
  handleChange?: (type: keyof RoomForm, e: ChangeEvent<HTMLInputElement>) => void;
};
export const RoomFormPage = (data: FormSettings) => {
  const navigate = useNavigate();
  const isEdit = data.formType === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomForm>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: data.room?.name,
      capacity: data.room?.capacity,
      description: data.room?.description,
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <p className="m-2 flex justify-center pt-4 text-2xl">{isEdit ? "更新画面" : "作成画面"}</p>
      <div className="mx-auto max-w-xl">
        <form
          className="space-y-4 rounded-md bg-white p-6 shadow-md"
          onSubmit={handleSubmit(data.onSubmit)}
        >
          <div className="grid-col grid gap-4">
            <div>
              <p className="">会議室名</p>
              <input
                className="h-8 w-full rounded-sm border border-slate-300"
                {...register("name", {
                  onChange: (e) => {
                    if (isEdit) {
                      data.handleChange?.("name", e);
                    }
                  },
                })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
              <p>人数</p>
              <input
                className="h-8 rounded-sm border border-slate-300"
                {...register("capacity", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    if (isEdit) {
                      data.handleChange?.("capacity", e);
                    }
                  },
                })}
              />
              {errors.capacity && <span>{errors.capacity.message}</span>}
            </div>
            <div>
              <p>説明</p>
              <input
                className="h-8 w-full rounded-sm border border-slate-300"
                {...register("description", {
                  onChange: (e) => {
                    if (isEdit) {
                      data.handleChange?.("description", e);
                    }
                  },
                })}
              />
              {errors.description && <span>{errors.description.message}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button name={isEdit ? "更新" : "作成"} type="submit" colorType="primary"></Button>
            <Button
              name="戻る"
              type="button"
              colorType="normal"
              onClick={() => navigate(-1)}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};
