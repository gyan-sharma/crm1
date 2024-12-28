import React from 'react';
import { getStageColor, getPriorityColor } from '../../utils/styleHelpers';
import { formatStageValue, formatPriorityValue } from '../../utils/formatters';

interface OpportunityBadgeProps {
  stage?: string;
  priority?: string;
}

export default function OpportunityBadge({ stage, priority }: OpportunityBadgeProps) {
  if (!stage && !priority) return null;

  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  if (stage) {
    return (
      <span className={`${baseClasses} ${getStageColor(stage)}`}>
        {formatStageValue(stage)}
      </span>
    );
  }

  if (priority) {
    return (
      <span className={`${baseClasses} ${getPriorityColor(priority)}`}>
        {formatPriorityValue(priority)}
      </span>
    );
  }

  return null;
}