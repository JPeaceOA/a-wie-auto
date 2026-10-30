"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "EUR" | "NGN" | "USD";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  rateFromEUR: number; // 1 EUR = rate * Currency
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
    rateFromEUR: 1.0,
  },
  NGN: {
    code: "NGN",
    symbol: "₦",
    label: "NGN (₦)",
    rateFromEUR: 1750, // Realistic market rate: 1 EUR ≈ 1,750 NGN
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    rateFromEUR: 1.08,
  },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInEUR: number) => string;
  convertPrice: (amountInEUR: number) => number;
  currentConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    const saved = localStorage.getItem("awiewagen_currency") as Currency | null;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("awiewagen_currency", c);
    } catch (e) {
      // Ignore if localStorage unavailable
    }
  };

  const currentConfig = CURRENCIES[currency] || CURRENCIES.EUR;

  const convertPrice = (amountInEUR: number): number => {
    return Math.round(amountInEUR * currentConfig.rateFromEUR);
  };

  const formatPrice = (amountInEUR: number): string => {
    const converted = convertPrice(amountInEUR);
    const formattedNum = converted.toLocaleString("en-US");
    return `${currentConfig.symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currentConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
