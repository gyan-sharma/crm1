import { FORECAST_CATEGORIES } from '../types';

export function formatStageValue(stage: string | null | undefined): string {
  if (!stage) return 'Unknown';
  return stage.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatPriorityValue(priority: string | null | undefined): string {
  if (!priority) return 'Unknown';
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function formatForecastCategory(category: string | null | undefined): string {
  if (!category || !FORECAST_CATEGORIES[category as keyof typeof FORECAST_CATEGORIES]) {
    return 'Unknown';
  }
  const forecast = FORECAST_CATEGORIES[category as keyof typeof FORECAST_CATEGORIES];
  return `${forecast.name} (${forecast.probability}%)`;
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '€0';
  return `€${Math.ceil(value).toLocaleString()}`;
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Not set';
  return new Date(date).toLocaleDateString();
}

export function toTitleCase(str: string): string {
  if (!str) return '';
  return str.toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}