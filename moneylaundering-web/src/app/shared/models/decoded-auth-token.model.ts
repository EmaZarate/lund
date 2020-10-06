import { IdentityRoles } from 'src/constants/identity-roles';
import { Genders } from 'src/constants/gender';
import { UserIdTypes } from 'src/constants/user-id-types';


export interface DecodedAuthToken {
  ApplicationId: number;
  ApplicationToken: string;
  AutomationAccess: boolean;
  nameid: string;
  unique_name: string;
  email: string;
  FirstName: string;
  LastName: string;
  TaxId: number;
  OfficialIdType: UserIdTypes;
  gender: Genders;
  CuitCuil: number;
  CreatedDate: Date;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}