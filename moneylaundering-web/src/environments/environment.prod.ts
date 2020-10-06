export const environment = {
  production: false,

  applicationToken: '8A03C04A-EC66-4C24-B9D7-7ACE2349513F',

  activeDirectory: {
    appId: '0d8478f4-7ee1-4591-89cd-02f9646c938a',
    appSecret: '-yFSEnZBI/GVd@]MGfs80Olb1namFtG3',
    redirectUri: 'https://prevencionlavado.sancristobal.com.ar/assets/microsoft-graph-auth.html',
    tenatID: 'b6f16b85-9472-48bd-85f5-0dd35eafbb50'
  },  

  server: {
    web: {
      home: 'https://prevencionlavado.sancristobal.com.ar'
    },
    api: {
      baseUrl: 'http://localhost:7001'
    }
  },
};