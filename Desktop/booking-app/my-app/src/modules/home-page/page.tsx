import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Meeting Room Booking
        </h1>
        <p className="text-lg text-gray-600">
          Система бронювання переговорних кімнат
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button asChild>
            <Link to="/login">Увійти</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/register">Реєстрація</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
