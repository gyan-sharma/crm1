import React from 'react';
import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';

interface Metric {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{metric.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </p>
            </dd>
          </div>
        );
      })}
    </div>
  );
}