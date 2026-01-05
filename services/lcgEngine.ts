
import { LCGParameters, HullDobellAnalysis } from '../types';

export const getGCD = (a: number, b: number): number => {
  return b === 0 ? a : getGCD(b, a % b);
};

export const getPrimeFactors = (n: number): number[] => {
  const factors = new Set<number>();
  let d = 2;
  let temp = n;
  while (temp >= d * d) {
    if (temp % d === 0) {
      factors.add(d);
      temp /= d;
    } else {
      d++;
    }
  }
  if (temp > 1) factors.add(temp);
  return Array.from(factors);
};

export const analyzeHullDobell = (params: LCGParameters): HullDobellAnalysis => {
  const { a, c, m } = params;

  // 1. c and m are relatively prime
  const relativelyPrime = getGCD(c, m) === 1;

  // 2. a-1 is divisible by all prime factors of m
  const primeFactors = getPrimeFactors(m);
  const primeFactorsDivisible = primeFactors.every(p => (a - 1) % p === 0);

  // 3. if 4 divides m, then 4 divides a-1
  const divisibleBy4 = (m % 4 === 0) ? ((a - 1) % 4 === 0) : true;

  const isFullPeriod = relativelyPrime && primeFactorsDivisible && divisibleBy4;

  let recommendation = "";
  if (isFullPeriod) {
    recommendation = "Excellent! These parameters satisfy the Hull-Dobell Theorem for a full-period generator (period = m). This will yield a sequence that visits every integer from 0 to m-1.";
  } else {
    recommendation = "Warning: These parameters do NOT yield a full period. The sequence will repeat earlier than expected, potentially leading to poor pseudo-randomness.";
    if (!relativelyPrime) recommendation += " 'c' and 'm' should be relatively prime.";
    if (!primeFactorsDivisible) recommendation += " 'a-1' should be divisible by all prime factors of 'm'.";
    if (!divisibleBy4) recommendation += " Since 'm' is divisible by 4, 'a-1' must also be divisible by 4.";
  }

  return {
    isFullPeriod,
    conditions: {
      relativelyPrime,
      primeFactorsDivisible,
      divisibleBy4
    },
    recommendation
  };
};

export const generateLCGSequence = (params: LCGParameters, length: number): number[] => {
  const { a, c, m } = params;
  const sequence: number[] = [];
  let x = 1; // Start with X=1 as per requirement
  
  for (let i = 0; i < length; i++) {
    x = (a * x + c) % m;
    sequence.push(x / m); // Normalize to [0, 1] for grayscale
  }
  
  return sequence;
};
