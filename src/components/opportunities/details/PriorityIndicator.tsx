import React from 'react';
import { getPriorityColor } from '../../../utils/styleHelpers';
import { formatPriorityValue } from '../../../utils/formatters';

interface PriorityIndicatorProps {
  priority: string;
}

export default function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPriorityColor(priority)}`}>
      {formatPriorityValue(priority)}
    </span>
  );
}