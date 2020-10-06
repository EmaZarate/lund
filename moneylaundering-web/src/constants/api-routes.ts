export const apiRoutes = {
    base: 'api',
    case: {
        base: 'case',
        getByFilter: 'case/getByFilter'        
    },
    status: {
        base: 'status'
    },
    businessunit: {
        base: 'businessunit'
    },
    caseGroup:{
        base: 'caseGroup'
    },
    caseType:{
        base: 'caseType'
    },
    person:{
        base:'person',
        getByFilter: 'person/getByFilter',
        groupCode: 'person/getByGroupCode'

    },
    news:{
        base:'news'
    },
    documentType:{
        base:'documentType'},

    document: {
        base: 'document',
        byPersonIdWithoutCase: 'document/byPersonIdWithoutCase'
    },
    caseDocument:{
        base:'caseDocument'
    },
    risk: {
        base: 'risk'
    },
    state: {
        base: 'state'
    },
    location: {
        base: 'location',
        getByFilter: 'location/getByFilter'
    },
    newsType: {
        base: 'newsType'
    },
    newsReason: {
        base: 'newsReason'
    },
    file:{
        base:'file'
    },
    group: {
        base: 'group',      
    },
    activity:{
        base:'activity'
    },
    user: {
        base: 'user'
    },
    mailType: {
        base: 'mailType'
    },
    documentLetterType: {
        base: 'documentLetterType'
    },
    vehicle: {
        base: 'vehicle'
    },
    grayList: {
        base: 'grayList'
    },
    grayListDocument: {
        base: 'grayListDocument'
    },
    producer: {
        base: 'producer'
    }
     
};