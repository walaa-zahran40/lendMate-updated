export interface Calculation {
  id: number;
  paymentNumber?: number;
  dueDate?: Date;
  balanceBefore?: number;
  balanceAfter?: number;
  insuranceOutcome?: number;
  principal?: number;
  installment?: number;
  interest?: number;
}
