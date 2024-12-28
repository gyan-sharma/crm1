import React from 'react';
import { BlockchainOpportunity } from '../../types';

interface OpportunityStageChartProps {
  opportunities: BlockchainOpportunity[];
}

export default function OpportunityStageChart({ opportunities }: OpportunityStageChartProps) {
  // Define all possible stages and their display order
  const stages = [
    { key: 'new', label: 'New', color: 'bg-blue-500' },
    { key: 'qualification', label: 'Qualification', color: 'bg-purple-500' },
    { key: 'proposal', label: 'Proposal', color: 'bg-indigo-500' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
    { key: 'closed_won', label: 'Closed Won', color: 'bg-green-500' },
    { key: 'closed_lost', label: 'Closed Lost', color: 'bg-red-500' }
  ];

  const total = opportunities.length;

  const stageData = stages.map(stage => {
    const opps = opportunities.filter(opp => opp.stage === stage.key);
    const count = opps.length;
    const value = opps.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0);
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return {
      ...stage,
      count,
      value,
      percentage
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Pipeline by Stage</h3>
      <div className="space-y-4">
        {stageData.map(stage => (
          <div key={stage.key} className="relative">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{stage.label}</span>
              <div className="text-right">
                <span className="font-medium">{stage.count}</span>
                <span className="text-gray-500 ml-1">
                  ({stage.percentage.toFixed(1)}%)
                </span>
                <div className="text-xs text-gray-500">
                  €{stage.value.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${stage.color}`}
                style={{ width: `${stage.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}