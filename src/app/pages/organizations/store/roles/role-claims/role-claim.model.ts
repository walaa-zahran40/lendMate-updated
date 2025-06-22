import { PageOperation } from '../../page-operations/page-operation.model';

export interface RoleClaim {
  guid?: string;
  isActive?: boolean;
  tenantId?: number;
  pageOperationId?: number;
  pageOperation?: PageOperation | null;
  deleterUserId?: number | null;
  deletionTime?: string | null;
  isDeleted?: boolean;
  role?: any;
  id?: number;
  roleId?: any;
  claimType?: string;
  claimValue?: string;
  page?: any;
  operation?: any;
}
