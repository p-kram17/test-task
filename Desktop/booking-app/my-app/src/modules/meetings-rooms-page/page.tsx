"use client";
import { useEffect, useState } from "react";
import { Button } from "@/shared/shad-cn/button";
import RoomForm from "./room-form/components/room-form";
import { useRoomStore } from "./store/use-room-store";


export default function RoomsPage() {
  const { rooms, loadRooms, removeRoom, loading } = useRoomStore();
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Button
        onClick={() => {
          setShowForm(true);
          setEditingRoom(null);
        }}
      >
        Додати кімнату
      </Button>

      {showForm && (
        <RoomForm
          id={editingRoom ?? undefined}
          initialName={
            editingRoom ? rooms.find((r) => r.id === editingRoom)?.name : ""
          }
          initialDescription={
            editingRoom
              ? rooms.find((r) => r.id === editingRoom)?.description
              : ""
          }
          onClose={() => setShowForm(false)}
        />
      )}

      {loading && <p>Завантаження...</p>}

      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-4 border rounded-md flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-600">{room.description}</p>
            </div>
            <div className="space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  setEditingRoom(room.id);
                  setShowForm(true);
                }}
              >
                Редагувати
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeRoom(room.id)}
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
