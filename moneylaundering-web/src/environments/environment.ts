// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  applicationToken: '8A03C04A-EC66-4C24-B9D7-7ACE2349513F',

  activeDirectory: {
    appId: '0d8478f4-7ee1-4591-89cd-02f9646c938a',
    appSecret: '-yFSEnZBI/GVd@]MGfs80Olb1namFtG3',
    redirectUri: 'http://localhost:4200/assets/microsoft-graph-auth.html',
    tenatID: 'b6f16b85-9472-48bd-85f5-0dd35eafbb50'
  },  

  server: {
    web: {
      home: 'http://localhost:4200'
    },
    api: {
      baseUrl: 'http://localhost:7001',
      auth: 'https://api-aks-dev.sancristobalonline.com.ar/identityapi'
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
