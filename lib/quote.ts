// Shared by the quote form (client) and /api/quote (server) — keep free of image imports.

// TODO(samson): confirm these bands match his typical job sizes
export const budgets = ["Under KSh 100,000", "KSh 100,000 – 300,000", "KSh 300,000 – 700,000", "Over KSh 700,000", "Not sure yet"] as const;

export type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  services?: string[];
  budget?: string;
  details?: string;
  // Honeypot — hidden from people, bots fill it
  company?: string;
};

export const phonePattern = /^\+?[\d\s()-]{9,20}$/;
