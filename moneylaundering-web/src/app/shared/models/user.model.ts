import { Genders } from 'src/constants/gender';
import { UserIdTypes, UserIdType } from 'src/constants/user-id-types';
import { IdentityRoles } from 'src/constants/identity-roles';


export class User {
  userId?: string;
  cuitCuil?: number;
  email?: string;
  firstName?: string;
  gender?: Genders;
  idType?: UserIdTypes;
  key?: string;
  isSignedUpDigitalPolicy?: boolean;
  lastName?: string;
  roles: string;
  taxId?: number;
  shouldShowOnlineMedic: boolean;

  static obfuscateEmail(email: string): string {
    const splitEmail = email.split('@');
    const userName = `${splitEmail[0].slice(0, 3)}****`;
    const domain = splitEmail[1];
    return `${userName}@${domain}`;
  }

  constructor(data: {
    userId?: string;
    cuitCuil?: number;
    firstName?: string;
    email?: string;
    gender?: Genders;
    key?: string;
    isSignedUpDigitalPolicy?: boolean;
    idType?: UserIdTypes;
    lastName?: string;
    roles: string;
    taxId?: number;
    personType?: string;
    //policies?: Policy[]
  }) {

    this.roles = data.roles;

    if (data.userId) {
      this.userId = data.userId;
    }

    if (data.firstName) {
      this.firstName = data.firstName;
    }

    if (data.email) {
      this.email = data.email;
    }

    if (data.gender) {
      this.gender = data.gender;
    }

    if (data.idType) {
      this.idType = data.idType;
    }

    if (data.lastName) {
      this.lastName = data.lastName;
    }

    if (data.cuitCuil) {
      this.cuitCuil = data.cuitCuil;
    }

    if (data.taxId) {
      this.taxId = data.taxId;
    }

    if (data.key !== undefined) {
      this.key = data.key;
    }

    this.isSignedUpDigitalPolicy = data.isSignedUpDigitalPolicy;
    //this.shouldShowOnlineMedic = this.calculateShouldShowOnlineMedic(data);
  }

  getId() {
    if (!this.idType) {
      return null;
    }
    return (this.idType === UserIdType.Dni || this.idType === UserIdType.Passport) ? this.taxId : this.cuitCuil;
  }

  getFullName() {
    return this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : null;
  }

  getShortName() {
    return this.firstName || this.lastName;
  }
  shouldUpdateProperties() {
    return !this.key;
  }

//   private calculateShouldShowOnlineMedic(data: Partial<{personType: string, policies?: Policy[]}>) {

//      return data.personType === PersonTypeEnum.natural &&
//             data.policies &&
//             data.policies.some(policy => policy.isValidForOnlineMedic()  );
//   }
}
