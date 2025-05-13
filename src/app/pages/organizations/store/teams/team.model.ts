export interface Team {
  id: number;
  code?: string;
  name: string;
  nameAR: string;
  departmentId : number;
  department? : any;
  isActive?: boolean;
}