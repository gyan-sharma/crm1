import { useState, useEffect } from 'react';
import db from '../lib/db';

export function useUserNames() {
  const [userMap, setUserMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadUsers = async () => {
      const users = await db.users.toArray();
      const map = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {} as Record<string, string>);
      setUserMap(map);
    };
    loadUsers();
  }, []);

  const getUserName = (userId: string) => userMap[userId] || 'Unknown User';

  return { getUserName };
}