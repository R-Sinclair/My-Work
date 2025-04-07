// src/hooks/useResendOtpTimer.js
import { useState, useEffect, useCallback } from "react";

const useResendOtpTimer = (maxAttempts = 3, cooldown = 30) => {
  const [counter, setCounter] = useState(cooldown);
  const [canResend, setCanResend] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);

  useEffect(() => {
    if (canResend || attemptsLeft === 0) return;
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return cooldown;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [canResend, attemptsLeft, cooldown]);

  const triggerResend = useCallback(() => {
    if (!canResend || attemptsLeft === 0) return false;
    setCanResend(false);
    setAttemptsLeft((prev) => prev - 1);
    setCounter(cooldown);
    return true;
  }, [canResend, attemptsLeft, cooldown]);

  return {
    counter,
    canResend,
    attemptsLeft,
    triggerResend,
  };
};

export default useResendOtpTimer;
