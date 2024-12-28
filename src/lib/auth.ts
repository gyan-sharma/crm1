import db from './db';
import { User } from '../types';

// Initialize admin user if not exists
async function initializeAdminUser() {
  const adminExists = await db.users.where('email').equals('admin@mail.com').first();
  
  if (!adminExists) {
    const adminUser: User = {
      id: crypto.randomUUID(),
      name: 'Admin User',
      email: 'admin@mail.com',
      role: 'admin',
      created_at: new Date().toISOString()
    };
    await db.users.add(adminUser);
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Ensure admin user exists
  await initializeAdminUser();

  // For demo purposes, we'll only check against the admin user
  if (email === 'admin@mail.com' && password === 'password') {
    const user = await db.users.where('email').equals(email).first();
    return user || null;
  }
  return null;
}