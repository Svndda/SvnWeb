import { useMemo } from 'react';
import { classNames } from '../utils/classNames';
import { formatDateLabel } from '../utils/time';

type DatePillProps = { date: Date; withIcon?: boolean; className?: string };

export function DatePill({ date, withIcon = false, className }: DatePillProps) {
  const label = useMemo(() => formatDateLabel(date), [date]);
  return (
    <div className={classNames('date-pill', className)}>
      {withIcon && <span>✦</span>} Nuestra cita · {label}
    </div>
  );
}
