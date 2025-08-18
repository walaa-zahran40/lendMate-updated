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
  letterOfGuaranteeAmount: string;
}

export interface PurchaseOrder {
  id: number;
  firstClaimStatusId: number;
  date: string; // ISO string, e.g. "2025-08-18T06:26:39.617Z"
  currencyId: number;
  leasingAgreementId: number;
  deliveryWithin: number;
  deliveryWithinUnitId: number;
  vendorId: number;
  vendorAddressId: number;
  deliveryLocationDetails: string;
  purchaseOrderFinancialActivities: PurchaseOrderFinancialActivity[];
  officerId: number;
  firstSignatoryOfficerId: number;
  secondSignatoryOfficerId: number;
  isActive: boolean;
}
