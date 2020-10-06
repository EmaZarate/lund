export enum UserIdType {
    Cuit = 'Ext_CUIT80',
    Dni = 'Ext_DNI96',
    Passport = 'Ext_PAS94',
  }
  
  export type UserIdTypes = UserIdType.Cuit | UserIdType.Dni | UserIdType.Passport;
  
  interface Length {
    minLength: number;
    maxLength: number;
  }
  
  export const userIdTypeLength = new Map<string, Length>([
    [UserIdType.Cuit, { minLength: 11, maxLength: 11 }],
    [UserIdType.Dni, { minLength: 7, maxLength: 8 }],
    [UserIdType.Passport, { minLength: 7, maxLength: 25 }]
  ]);