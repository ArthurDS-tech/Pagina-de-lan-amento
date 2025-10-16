"use client";

import { useEffect, useState } from "react";

export function SimpleSpace() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number}>>([]);

  useEffect(() => {
    // Gerar estrelas aleatórias
    const newStars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* Estrelas */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Planetas */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full animate-bounce" 
           style={{ animationDuration: '4s' }} />
      
      <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full animate-pulse" 
           style={{ animationDuration: '3s' }} />

      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-600 rounded-full animate-spin" 
           style={{ animationDuration: '8s' }} />

      {/* Texto central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-sentient text-white animate-pulse">
            Welcome to Space
          </h1>
          <p className="text-xl font-mono text-white/80">
            Your journey begins now...
          </p>
          
          {/* Partículas flutuantes */}
          <div className="flex justify-center space-x-4 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Efeito de nebulosa */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-1/2 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}