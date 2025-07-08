/** Asset type associated with a mandate */
export interface MandateAssetType {
  assetTypeId: number;
  assetsTypeDescription: string;
}

/** Current workflow action for a mandate */
export interface MandateWorkflowAction {
  id: number;
  name: string;
  nameAr: string;
}

/** Allowed next workflow actions for a mandate */
export interface AllowedMandateWorkflowAction {
  id: number;
  name: string;
  nameAr: string;
}

/** Contact person saved on a mandate */
export interface MandateContactPerson {
  contactPersonId: number;
  contactPersonName: string;
  contactPersonNameAr: string;
}

/** Officer saved on a mandate */
export interface MandateOfficer {
  officerId: number;
  officerName: string;
  officerNameAr: string;
}

/** Grace period setting for a mandate */
export interface MandateGracePeriodSetting {
  gracePeriodCount: number;
  gracePeriodUnitId: number;
}

/** Full detail model for Leasing Mandates */
export interface MandateDetail {
  id: number;
  code: string;
  description: string;
  date: Date;
  clientView?: any;
  clientId: number;
  parentMandateId: number | null;
  mandateId: number;
  validityCount: number;
  validityUnitId: number;
  notes: string;
  productId: number;
  leasingTypeId: number;
  insuredById: number;
  indicativeRentals: number;
  mandateAssetTypes: MandateAssetType[];
  mandateCurrentWorkFlowAction: MandateWorkflowAction;
  allowedMandateWorkflowActions: AllowedMandateWorkflowAction[];
  mandateContactPersons: MandateContactPerson[];
  mandateOfficers: MandateOfficer[];
  mandateGracePeriodSettingView: MandateGracePeriodSetting;
}
