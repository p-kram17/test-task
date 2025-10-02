import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Доступ заборонено
        </h1>
        <p className="mb-6">У вас немає дозволу на перегляд цієї сторінки.</p>
        <Button asChild>
          <Link to="/">Повернутися на головну</Link>
        </Button>
      </div>
    </div>
  );
}