export interface PurchaseOrderFinancialActivity {
  assetId: number;
  taxAmount: number;
  purchasePrice: number;
  salesPrice: number;
  stickerPrice: number;
  netValue: number;
  assetCount: number;
  paymentTypeId: number;
  paymentPeriodUnitId: number;
  depreciationValue: number;
  provisionAmount: number;
  downPayment: number;
  isLetterOfGuaranteeAmount: boolean;
  letterOfGuaranteeAmount: string | null; // allow null from GET
}

export interface PurchaseOrder {
  id: number;
  firstClaimStatusId: number;
  number?: string | null;
  date: string; // ISO
  currencyId: number;
  leasingAgreementId: number;
  deliveryWithin: number;
  deliveryWithinUnitId: number;
  vendorId: number;
  vendorAddressId: number;
  deliveryLocationDetails: string;
  purchaseOrders?: { purchaseOrderId: number }[];

  purchaseOrderFinancialActivities: PurchaseOrderFinancialActivity[];
  officerId: number;
  firstSignatoryOfficerId: number;
  secondSignatoryOfficerId: number;
  isActive: boolean;
}
