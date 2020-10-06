import { Pagination } from 'src/app/shared/models/pagination.model';

export interface GrayListFilter {
    cuit?: string;
    fullName?: string;
    active?: boolean | null;
    pagination?: Pagination;
}