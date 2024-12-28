import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface StakeholdersListProps {
  stakeholders: BlockchainOpportunity['stakeholders'];
}

export default function StakeholdersList({ stakeholders }: StakeholdersListProps) {
  if (!stakeholders?.length) {
    return <p className="text-sm text-gray-500">No stakeholders added</p>;
  }

  return (
    <div className="space-y-4">
      {stakeholders.map((stakeholder, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{stakeholder.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{stakeholder.role}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Contact</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a href={`mailto:${stakeholder.contact}`} className="text-indigo-600 hover:text-indigo-500">
                  {stakeholder.contact}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}