export interface PaginatorOptions {
    totalCount: number;
    page: number;
    perPage?: number;
}
export interface PaginatorResult {
    pageList: number[];
    page: number;
    prevPage: number;
    nextPage: number;
    startPage: number;
    lastPage: number;
    hasPrev: boolean;
    hasNext: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
}
export default function paginator({ totalCount, page, perPage }: PaginatorOptions): PaginatorResult;
//# sourceMappingURL=paginator.d.ts.map