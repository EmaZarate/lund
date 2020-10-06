export class ContactInfo {
    contactMail: string;
    contactAddress: string;
    contactZipCode: number;
    contactCity: string;
    contactStateId: number;

    constructor(
        contactMail: string, 
        contactAddress: string, 
        contactZipCode: number, 
        contactCity: string, 
        contactStateId: number) 
        {
            this.contactMail = contactMail;
            this.contactAddress = contactAddress;
            this.contactZipCode = contactZipCode;
            this.contactCity = contactCity;
            this.contactStateId = contactStateId;
        }
}
