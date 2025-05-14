export interface LeasingMandate {
  id: number;
  code?: string;
  description: string;
  date: Date;
  validityCount: number;
  parentMandateId : number;
  indicativeRentals : number;
  clientId : number;
  client? : any;
  validityUnitId : number;
  validityUnit? : any;
  productId : number;
  product? : any;
  leasingTypeId : number;
  leasingType? : any;
  insuredById : number;
  insuredBy? : any;
  notes: string;
  isActive?: boolean;
}
