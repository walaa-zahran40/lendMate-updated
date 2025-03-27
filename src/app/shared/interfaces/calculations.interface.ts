export interface Calculation {
  code: number;
  paymentNumber?: number;
  dueDate?: Date;
  balanceBefore?: number;
  balanceAfter?: number;
  insuranceOutcome?: number;
  principal?: number;
  installment?: number;
  interest?: number;
  nameEN: string;
  nameAR: string;
}
