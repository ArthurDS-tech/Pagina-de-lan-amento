"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate?: string;
  className?: string;
}

export function Countdown({ targetDate, className = "" }: CountdownProps) {
  // Data alvo - você pode alterar esta data
  const target = targetDate ? new Date(targetDate) : new Date("2025-12-31T23:59:59");
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetTime = target.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="text-center">
        <p className="font-mono text-xs sm:text-sm text-foreground/60 uppercase tracking-wider mb-2">
          Launch Countdown
        </p>
        <div className="flex items-center justify-center space-x-4 sm:space-x-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-primary">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="font-mono text-xs text-foreground/60 uppercase">
              Days
            </div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-foreground/40">
            :
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-primary">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="font-mono text-xs text-foreground/60 uppercase">
              Hours
            </div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-foreground/40">
            :
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-primary">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="font-mono text-xs text-foreground/60 uppercase">
              Min
            </div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-foreground/40">
            :
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-sentient text-primary">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="font-mono text-xs text-foreground/60 uppercase">
              Sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}