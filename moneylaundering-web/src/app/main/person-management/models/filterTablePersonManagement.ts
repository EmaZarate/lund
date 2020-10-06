import { Pagination } from 'src/app/shared/models/pagination.model';

export class FilterTablePersonManagement {
    cuit: string;
    fullName: string;
    riskId: number;
    tranBefore: string;
    tranAfter: string;    
    orderId: number;
    businessUnitId: number;
    group: boolean;
    getWithoutGrouping: boolean;
    groupCode: number;
    pagination?: Pagination;
}
