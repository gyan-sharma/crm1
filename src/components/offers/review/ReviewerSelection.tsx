import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
import db from '../../../lib/db';

interface ReviewerSelectionProps {
  onSubmit: (reviewerIds: string[]) => Promise<void>;
  isLoading?: boolean;
}

export default function ReviewerSelection({ onSubmit, isLoading }: ReviewerSelectionProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await db.users.toArray();
    setUsers(allUsers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(selectedReviewers);
  };

  const handleReviewerChange = (index: number, userId: string) => {
    const newReviewers = [...selectedReviewers];
    newReviewers[index] = userId;
    setSelectedReviewers(newReviewers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">
              Reviewer {index + 1}
            </label>
            <select
              value={selectedReviewers[index] || ''}
              onChange={(e) => handleReviewerChange(index, e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            >
              <option value="">Select Reviewer</option>
              {users
                .filter(user => !selectedReviewers.includes(user.id) || selectedReviewers[index] === user.id)
                .map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || selectedReviewers.length !== 3}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send for Review'}
        </button>
      </div>
    </form>
  );
}