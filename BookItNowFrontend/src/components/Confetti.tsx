import confetti from "canvas-confetti";


export function registerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
    });
  }
      