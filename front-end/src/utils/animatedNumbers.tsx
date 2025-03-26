"use client";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const targetValue = parseInt(value);
  const animationDuration = 10;

  const animateValue = () => {
    let start = 0;
    const increment = Math.floor(targetValue / 300) || 1;
    const stepTime = Math.abs(Math.floor(animationDuration / targetValue));

    const timer = setInterval(() => {
      start += increment;
      setCurrentValue(start);
      if (start >= targetValue) {
        clearInterval(timer);
        setCurrentValue(targetValue);
      }
    }, stepTime);
  };

  useEffect(() => {
    animateValue();
  }, []);

  return <span>{currentValue}+</span>;
};
