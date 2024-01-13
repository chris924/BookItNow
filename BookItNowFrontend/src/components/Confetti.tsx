import confetti from "canvas-confetti";
import { ReactNode } from "react";

export function registerConfetti(): ReactNode {
  confetti({
    particleCount: 100,
    spread: 70,
  });

  return null;
}