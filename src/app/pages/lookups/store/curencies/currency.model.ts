// src/app/store/currencies/currency.model.ts
export interface Currency {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  iso: string;
  isDefault: boolean;
  isActive: boolean;
}
