"use client";

import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { Countdown } from "./countdown";
import { AuthModal } from "./auth-modal";
import { useState } from "react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh">
      <GL hovering={hovering} />

      {/* BETA RELEASE no topo */}
      <div className="pt-24 md:pt-32 text-center relative z-10">
        <Pill>BETA RELEASE</Pill>
      </div>

      {/* Conteúdo centralizado */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 space-y-16">
        {/* Título e descrição */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient">
            Unlock your <br />
            <i className="font-light">future</i> growth
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-6 max-w-[440px] mx-auto">
            Through perpetual investment strategies that outperform the market
          </p>
        </div>

        {/* Countdown com mais espaço */}
        <div className="py-8">
          <Countdown className="z-10" />
        </div>

        {/* Botão com mais espaço */}
        <div className="pt-8">
          <AuthModal>
            <Button
              className="max-sm:hidden"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Contact Us]
            </Button>
          </AuthModal>
          <AuthModal>
            <Button
              size="sm"
              className="sm:hidden"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Contact Us]
            </Button>
          </AuthModal>
        </div>
      </div>
    </div>
  );
}
