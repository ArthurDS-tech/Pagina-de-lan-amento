"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";

interface PageTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function PageTransition({ isVisible }: PageTransitionProps) {
  const [stage, setStage] = useState<'dissolve' | 'complete'>('dissolve');

  useEffect(() => {
    if (!isVisible) return;

    // Fase 1: Dissolução (3s) -> depois mostrar logo na mesma tela preta
    const timer1 = setTimeout(() => {
      setStage('complete');
    }, 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Fase 1: Dissolução suave */}
      {stage === 'dissolve' && (
        <>
          {/* Ondas de dissolução */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-black/20 animate-[wave_3s_ease-in-out_forwards]"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  clipPath: `circle(${20 + i * 15}% at ${30 + i * 10}% ${40 + i * 8}%)`,
                }}
              />
            ))}
          </div>

          {/* Partículas flutuantes */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-white/30 to-gray-300/20 animate-[float_3s_ease-out_forwards]"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  '--float-x': `${(Math.random() - 0.5) * 400}px`,
                  '--float-y': `${(Math.random() - 0.5) * 400}px`,
                } as any}
              />
            ))}
          </div>

          {/* Overlay final */}
          <div className="absolute inset-0 bg-black animate-[fadeInSlow_3s_ease-in-out_forwards] opacity-0" />
        </>
      )}

      {/* Fase 2: Tela preta com logo */}
      {stage === 'complete' && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <Logo className="w-32 md:w-48 lg:w-64 animate-[logoAppear_1s_ease-out_forwards] opacity-0" />
        </div>
      )}

      <style jsx>{`
        @keyframes wave {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.8; }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translate(var(--float-x), var(--float-y)) scale(0) rotate(180deg); 
          }
        }
        
        @keyframes fadeInSlow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes logoAppear {
          0% { 
            opacity: 0; 
          }
          100% { 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}