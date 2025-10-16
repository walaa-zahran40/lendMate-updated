export interface Condition {
  id: number;
  description: string;
  conditionType : number;
  functionName: string;
  conditionExpressionId: number;
  conditionExpression?: any;
}