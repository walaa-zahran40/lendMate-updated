export interface LicenseInformation {
  id: number;
  licenseNumber: string;
  licenseTypeId: number;
  licenseProviderId: number;
  startDate: string;
  endDate: string;
  licenseInUseBy: string;
  isActive?: boolean;
}
