import { forwardRef } from 'react';

const outerRadius = 1300;
const innerRadius = 1250;
const rimRadius = 1220;
const hubRadius = 150;
const spokes = 12;
const treadCount = 60;

const WheelRim = forwardRef<SVGSVGElement, { className?: string }>(
  function WheelRim({ className }, ref) {
    return (
      <svg className={className} viewBox="-1450 -1450 2900 2900" ref={ref}>
        {/* Outer tire edge */}
        <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="currentColor" strokeWidth="2" />

        {/* Inner tire edge */}
        <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Tire tread/profile - lines */}
        {Array.from({ length: treadCount }).map((_, i) => {
          const angle = (i * 360 / treadCount) * (Math.PI / 180);
          const x1 = Math.cos(angle) * innerRadius;
          const y1 = Math.sin(angle) * innerRadius;
          const x2 = Math.cos(angle) * outerRadius;
          const y2 = Math.sin(angle) * outerRadius;
          return (
            <line
              key={`tread-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}

        {/* Rim edge */}
        <circle cx="0" cy="0" r={rimRadius} fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Hub */}
        <circle cx="0" cy="0" r={hubRadius} fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r={80} fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Spokes */}
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i * 360 / spokes) * (Math.PI / 180);
          const x1 = Math.cos(angle) * hubRadius;
          const y1 = Math.sin(angle) * hubRadius;
          const x2 = Math.cos(angle) * rimRadius;
          const y2 = Math.sin(angle) * rimRadius;
          return (
            <line
              key={`spoke-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
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
