import { PageOperation } from './page-operation.model';

export interface PageOperationGroup {
  pageName: string;
  pageOperations: PageOperation[];
}
