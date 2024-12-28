import React, { useState } from 'react';
import { RiskRating } from '../../../types/reviews';

interface ReviewFormProps {
  isFirstReviewer: boolean;
  onSubmit: (data: { comments: string; riskRating?: RiskRating }) => Promise<void>;
  isLoading?: boolean;
}

export default function ReviewForm({ isFirstReviewer, onSubmit, isLoading }: ReviewFormProps) {
  const [comments, setComments] = useState('');
  const [riskRating, setRiskRating] = useState<RiskRating>({
    technical: 5,
    commercial: 5,
    timeline: 5,
    scopeIncrease: 5,
    delivery: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      comments,
      riskRating: isFirstReviewer ? riskRating : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your review comments..."
          disabled={isLoading}
        />
      </div>

      {isFirstReviewer && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Risk Assessment</h4>
          
          {Object.entries(riskRating).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} Risk
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={(e) => setRiskRating(prev => ({
                    ...prev,
                    [key]: parseInt(e.target.value)
                  }))}
                  className="w-full"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium w-8">{value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}