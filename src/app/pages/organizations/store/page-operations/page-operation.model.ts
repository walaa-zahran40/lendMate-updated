export interface PageOperation {
  id: any;
  code?: string;
  pageId?: number;
  operationId?: number;
  page?: {
    id: number;
    name: string;
    nameAR: string;
    url: string;
  };
  operation?: {
    id: number;
    name: string;
    url: string;
  };
  isActive?: boolean;
}
