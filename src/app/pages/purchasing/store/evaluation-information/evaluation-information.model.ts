export interface EvaluationInformation {
  id: number;
  evaluatorId: number;
  assetId: number;
  assetEvaluationDescription: string;
  evaluationDate: string;
  isActive?: boolean;
}
