import React, { useEffect, useState } from 'react';
import { Target, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { BlockchainOpportunity, User } from '../types';
import db from '../lib/db';
import { getPeriodDates } from '../utils/dateUtils';
import { getMetricsWithChanges } from '../utils/metrics';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import OpportunityStageChart from '../components/dashboard/OpportunityStageChart';
import RecentOpportunities from '../components/dashboard/RecentOpportunities';
import ForecastChart from '../components/dashboard/ForecastChart';
import PeriodSelector, { Period } from '../components/dashboard/PeriodSelector';

export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<(BlockchainOpportunity & { sales_rep?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('month');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allOpportunities, salesReps] = await Promise.all([
        db.opportunities.orderBy('created_at').reverse().toArray(),
        db.users.toArray()
      ]);
      
      const opportunitiesWithSalesRep = allOpportunities.map(opportunity => ({
        ...opportunity,
        sales_rep: salesReps.find(rep => rep.id === opportunity.sales_rep_id)
      }));
      
      setOpportunities(opportunitiesWithSalesRep);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMetrics = () => {
    const dates = getPeriodDates(period);
    
    const currentPeriodOpps = opportunities.filter(opp => 
      new Date(opp.created_at) >= dates.currentStart &&
      new Date(opp.created_at) <= dates.currentEnd
    );

    const previousPeriodOpps = opportunities.filter(opp =>
      new Date(opp.created_at) >= dates.previousStart &&
      new Date(opp.created_at) <= dates.previousEnd
    );

    const metrics = getMetricsWithChanges(currentPeriodOpps, previousPeriodOpps);

    return [
      {
        name: 'Total Opportunities',
        value: metrics.totalOpportunities.value.toString(),
        change: `${metrics.totalOpportunities.change > 0 ? '+' : ''}${metrics.totalOpportunities.change.toFixed(1)}%`,
        changeType: metrics.totalOpportunities.change >= 0 ? 'increase' : 'decrease',
        icon: Target
      },
      {
        name: 'Pipeline Value',
        value: `€${metrics.pipelineValue.value.toLocaleString()}`,
        change: `${metrics.pipelineValue.change > 0 ? '+' : ''}${metrics.pipelineValue.change.toFixed(1)}%`,
        changeType: metrics.pipelineValue.change >= 0 ? 'increase' : 'decrease',
        icon: DollarSign
      },
      {
        name: 'Win Rate',
        value: `${metrics.winRate.value.toFixed(1)}%`,
        change: `${metrics.winRate.change > 0 ? '+' : ''}${metrics.winRate.change.toFixed(1)}%`,
        changeType: metrics.winRate.change >= 0 ? 'increase' : 'decrease',
        icon: TrendingUp
      },
      {
        name: 'Closed Won Value',
        value: `€${metrics.closedWonValue.value.toLocaleString()}`,
        change: `${metrics.closedWonValue.change > 0 ? '+' : ''}${metrics.closedWonValue.change.toFixed(1)}%`,
        changeType: metrics.closedWonValue.change >= 0 ? 'increase' : 'decrease',
        icon: BarChart3
      }
    ];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No opportunities yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Create your first opportunity to see metrics and insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your sales pipeline and performance metrics.
          </p>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <MetricsGrid metrics={getMetrics()} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpportunityStageChart opportunities={opportunities} />
        <ForecastChart opportunities={opportunities} />
      </div>

      <RecentOpportunities opportunities={opportunities.slice(0, 5)} />
    </div>
  );
}