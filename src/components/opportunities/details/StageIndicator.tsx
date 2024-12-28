import React from 'react';
import { getStageColor } from '../../../utils/styleHelpers';
import { formatStageValue } from '../../../utils/formatters';

interface StageIndicatorProps {
  stage: string;
}

export default function StageIndicator({ stage }: StageIndicatorProps) {
  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStageColor(stage)}`}>
      {formatStageValue(stage)}
    </span>
  );
}