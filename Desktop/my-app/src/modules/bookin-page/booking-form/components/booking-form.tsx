"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/shared/shad-cn/input";
import { Textarea } from "@/shared/shad-cn/textarea";
import { Button } from "@/shared/shad-cn/button";
import { useBookingStore } from "../../store/use-booking-store";

interface BookingFormProps {
  roomId: string;
  id?: string;
  initialData?: Partial<{
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }>;
  onClose?: () => void;
}

const bookingSchema = z.object({
  title: z.string().min(1, "Заголовок обов'язковий"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Початок обов'язковий"),
  endTime: z.string().min(1, "Кінець обов'язковий"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm({
  roomId,
  id,
  initialData,
  onClose,
}: BookingFormProps) {
  const { addBooking, editBooking, loading } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      if (id) {
        await editBooking(id, { ...data, roomId });
      } else {
        await addBooking({ ...data, roomId });
      }
      onClose?.();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-md bg-white shadow-md"
    >
      <Input placeholder="Заголовок" {...register("title")} />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <Textarea placeholder="Опис" {...register("description")} />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      )}

      <Input type="datetime-local" {...register("startTime")} />
      {errors.startTime && (
        <p className="text-red-500 text-sm">{errors.startTime.message}</p>
      )}

      <Input type="datetime-local" {...register("endTime")} />
      {errors.endTime && (
        <p className="text-red-500 text-sm">{errors.endTime.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Завантаження..." : id ? "Редагувати" : "Створити"}
      </Button>
    </form>
  );
}
