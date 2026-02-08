'use client';

const MAX_TILT_ANGLE = 3;
const CARD_PERSPECTIVE = 350;

const calculateTiltAngle = (mousePosition: number, containerSize: number): number => {
  const halfSize = containerSize / 2;
  const slope = -MAX_TILT_ANGLE / halfSize;

  if (mousePosition <= halfSize) {
    return MAX_TILT_ANGLE + slope * mousePosition;
  }
  return slope * (mousePosition - halfSize);
};

const useTiltEffect = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rotateY = calculateTiltAngle(e.nativeEvent.offsetX, target.offsetWidth);
    const rotateX = -calculateTiltAngle(e.nativeEvent.offsetY, target.offsetHeight);
    target.style.transform = `perspective(${CARD_PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(${CARD_PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`;
  };

  return { handleMouseMove, handleMouseLeave };
};

export default useTiltEffect;
