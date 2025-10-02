import { useState, type FormEvent } from 'react';
import type { UserRole } from '@/shared/types/user.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoomAccessControlProps {
  roomId: string;
  onAddUser: (email: string, role: UserRole) => Promise<void>;
}

export function RoomAccessControl({ roomId, onAddUser }: RoomAccessControlProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      await onAddUser(email, role);
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h3 className="font-medium mb-2">Додати користувача до кімнати</h3>
      <form onSubmit={handleSubmit} className="flex gap-2" onSubmitCapture={undefined}>
        <Input
          type="email"
          placeholder="Email користувача"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Користувач</SelectItem>
            <SelectItem value="admin">Адміністратор</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={isLoading}>
          Додати
        </Button>
      </form>
    </div>
  );
}
