"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/shad-cn/button";
import BookingForm from "./booking-form/components/booking-form";
import { useBookingStore } from "./store/use-booking-store";

export default function BookingsPage() {
  const { roomId } = useParams<{ roomId: string }>();
  
  if (!roomId) {
    return <div>Invalid room ID</div>;
  }
  const { bookings, loadBookings, removeBooking, loading } = useBookingStore();
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadBookings(roomId);
  }, [roomId]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Button
        onClick={() => {
          setShowForm(true);
          setEditingBooking(null);
        }}
      >
        Додати бронювання
      </Button>

      {showForm && (
        <BookingForm
          roomId={roomId}
          id={editingBooking ?? undefined}
          initialData={
            editingBooking
              ? bookings.find((b) => b.id === editingBooking)
              : undefined
          }
          onClose={() => setShowForm(false)}
        />
      )}

      {loading && <p>Завантаження...</p>}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-4 border rounded-md flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(b.startTime).toLocaleString()} -{" "}
                {new Date(b.endTime).toLocaleString()}
              </p>
            </div>
            <div className="space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  setEditingBooking(b.id);
                  setShowForm(true);
                }}
              >
                Редагувати
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeBooking(b.id)}
              >
                Видалити
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
