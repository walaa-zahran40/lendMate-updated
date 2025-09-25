export interface Portfolio {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  startDate: Date;
  incomeFactor: number;
  portfolioTypeId: number;
  legalEntity: string;
}
