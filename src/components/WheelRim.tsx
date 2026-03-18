import { forwardRef } from 'react';

const outerRadius = 1300;
const innerRadius = 1250;
const rimRadius = 1220;
const hubRadius = 150;
const spokes = 12;
const treadCount = 60;

const r = (n: number) => Math.round(n * 1000) / 1000;

const WheelRim = forwardRef<SVGSVGElement, { className?: string }>(
  function WheelRim({ className }, ref) {
    return (
      <svg className={className} viewBox="-1450 -1450 2900 2900" ref={ref}>
        <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="currentColor" strokeWidth="1" />

        {Array.from({ length: treadCount }).map((_, i) => {
          const angle = (i * 360 / treadCount) * (Math.PI / 180);
          return (
            <line
              key={`tread-${i}`}
              x1={r(Math.cos(angle) * innerRadius)}
              y1={r(Math.sin(angle) * innerRadius)}
              x2={r(Math.cos(angle) * outerRadius)}
              y2={r(Math.sin(angle) * outerRadius)}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}

        <circle cx="0" cy="0" r={rimRadius} fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r={hubRadius} fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r={80} fill="none" stroke="currentColor" strokeWidth="1" />

        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i * 360 / spokes) * (Math.PI / 180);
          return (
            <line
              key={`spoke-${i}`}
              x1={r(Math.cos(angle) * hubRadius)}
              y1={r(Math.sin(angle) * hubRadius)}
              x2={r(Math.cos(angle) * rimRadius)}
              y2={r(Math.sin(angle) * rimRadius)}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    );
  }
);

export default WheelRim;
