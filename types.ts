
export interface LCGParameters {
  a: number; // Multiplier
  c: number; // Increment
  m: number; // Modulus
}

export interface HullDobellAnalysis {
  isFullPeriod: boolean;
  conditions: {
    relativelyPrime: boolean;
    primeFactorsDivisible: boolean;
    divisibleBy4: boolean;
  };
  recommendation: string;
}

export interface WebhookConfig {
  url: string;
  method: 'POST' | 'GET';
}
