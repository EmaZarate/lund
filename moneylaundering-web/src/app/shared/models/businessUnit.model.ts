export class BusinessUnit {
    id: number;
    description: string;
    producers: Producers[]
}

export class Producers {
    businessUnitId: number;
    id: number;
    mail: string;
    originalCode: string;
    produceName: string;
}