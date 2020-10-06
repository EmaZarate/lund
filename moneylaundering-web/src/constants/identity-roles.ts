export enum IdentityRole {
    AccessApplication = 'AccessApplication',
    IdentityVerify = 'IdentityVerify',
    Migrated = 'Migrated'
  }
  
  export type IdentityRoles = keyof typeof IdentityRole;