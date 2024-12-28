import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '../types';
import db from '../lib/db';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await db.users.toArray();
    setUsers(allUsers);
  };

  const handleCreateUser = async (data: Omit<User, 'id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      const id = crypto.randomUUID();
      const newUser: User = {
        ...data,
        id,
        created_at: new Date().toISOString(),
      };
      
      await db.users.add(newUser);
      await loadUsers();
      setIsModalOpen(false);
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (data: Omit<User, 'id' | 'created_at'>) => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    try {
      await db.users.update(selectedUser.id, data);
      await loadUsers();
      setIsModalOpen(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await db.users.delete(selectedUser.id);
      await loadUsers();
      setIsDeleteDialogOpen(false);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage users and their roles in the system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <UserList
        users={users}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Create User'}
      >
        <UserForm
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          initialData={selectedUser || undefined}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
      />
    </div>
  );
}