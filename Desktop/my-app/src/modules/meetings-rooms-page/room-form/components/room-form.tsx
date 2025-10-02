"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/shared/shad-cn/input";
import { Textarea } from "@/shared/shad-cn/textarea";
import { Button } from "@/shared/shad-cn/button";
import { useRoomStore } from "../../store/use-room-store";

interface RoomFormProps {
  id?: string;
  initialName?: string;
  initialDescription?: string;
  onClose?: () => void;
}

const roomSchema = z.object({
  name: z.string().min(1, "Назва кімнати обов'язкова"),
  description: z.string().optional(),
});

type RoomFormValues = z.infer<typeof roomSchema>;

export default function RoomForm({
  id,
  initialName = "",
  initialDescription = "",
  onClose,
}: RoomFormProps) {
  const { addRoom, editRoom, loading } = useRoomStore();

  const { register, handleSubmit, formState: { errors } } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: { name: initialName, description: initialDescription },
  });

  const onSubmit = async (data: RoomFormValues) => {
    if (id) {
      await editRoom(id, data);
    } else {
      await addRoom(data.name, data.description || "");
    }
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-md bg-white shadow-md"
    >
      <Input placeholder="Назва кімнати" {...register("name")} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Textarea placeholder="Опис кімнати" {...register("description")} />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Завантаження..." : id ? "Редагувати" : "Створити"}
      </Button>
    </form>
  );
}
