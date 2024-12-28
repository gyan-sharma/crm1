export function getPeriodDates(period: 'week' | 'month' | 'quarter' | 'year'): {
  currentStart: Date;
  currentEnd: Date;
  previousStart: Date;
  previousEnd: Date;
} {
  const now = new Date();
  const currentEnd = now;
  let currentStart: Date;
  let previousStart: Date;
  let previousEnd: Date;

  switch (period) {
    case 'week':
      currentStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousEnd = new Date(currentStart);
      previousStart = new Date(previousEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    
    case 'month':
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      previousEnd = new Date(currentStart);
      previousStart = new Date(previousEnd.getFullYear(), previousEnd.getMonth() - 1, 1);
      break;
    
    case 'quarter':
      const currentQuarter = Math.floor(now.getMonth() / 3);
      currentStart = new Date(now.getFullYear(), currentQuarter * 3, 1);
      previousEnd = new Date(currentStart);
      previousStart = new Date(previousEnd.getFullYear(), (currentQuarter - 1) * 3, 1);
      break;
    
    case 'year':
      currentStart = new Date(now.getFullYear(), 0, 1);
      previousEnd = new Date(currentStart);
      previousStart = new Date(now.getFullYear() - 1, 0, 1);
      break;
    
    default:
      throw new Error('Invalid period');
  }

  return { currentStart, currentEnd, previousStart, previousEnd };
}