export interface BranchManager {
  id: number;
  branchId: number;
  branch?: any;
  managerId: number;
  startDate: Date;
  isCurrent: boolean;
}
