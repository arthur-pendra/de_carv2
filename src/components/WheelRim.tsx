import { forwardRef } from 'react';

const WheelRim = forwardRef<HTMLImageElement, { className?: string }>(
  function WheelRim({ className }, ref) {
    return (
      <img
        ref={ref}
        className={className}
        src="/WEEL_GD.png"
        alt="GD Carcare wiel"
      />
    );
  }
);

export default WheelRim;
