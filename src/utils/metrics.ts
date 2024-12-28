import { BlockchainOpportunity } from '../types';

interface PeriodMetrics {
  totalOpportunities: number;
  pipelineValue: number;
  winRate: number;
  closedWonValue: number;
}

export function calculateMetrics(opportunities: BlockchainOpportunity[]): PeriodMetrics {
  const closedWonOpps = opportunities.filter(opp => opp.stage === 'closed_won');
  
  return {
    totalOpportunities: opportunities.length,
    pipelineValue: opportunities.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0),
    winRate: opportunities.length > 0 ? (closedWonOpps.length / opportunities.length) * 100 : 0,
    closedWonValue: closedWonOpps.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0)
  };
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getMetricsWithChanges(
  currentPeriodOpps: BlockchainOpportunity[],
  previousPeriodOpps: BlockchainOpportunity[]
) {
  const current = calculateMetrics(currentPeriodOpps);
  const previous = calculateMetrics(previousPeriodOpps);

  return {
    totalOpportunities: {
      value: current.totalOpportunities,
      change: calculatePercentageChange(current.totalOpportunities, previous.totalOpportunities)
    },
    pipelineValue: {
      value: current.pipelineValue,
      change: calculatePercentageChange(current.pipelineValue, previous.pipelineValue)
    },
    winRate: {
      value: current.winRate,
      change: calculatePercentageChange(current.winRate, previous.winRate)
    },
    closedWonValue: {
      value: current.closedWonValue,
      change: calculatePercentageChange(current.closedWonValue, previous.closedWonValue)
    }
  };
}