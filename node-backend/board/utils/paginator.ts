import lodash from 'lodash';

const PAGE_LIST_SIZE = 10;

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

export default function paginator({ totalCount, page, perPage = 10 }: PaginatorOptions): PaginatorResult {
  const totalPage = Math.max(1, Math.ceil(totalCount / perPage));

  // 시작 페이지: 몫 * PAGE_LIST_SIZE + 1
  const quotient = Math.floor((page - 1) / PAGE_LIST_SIZE);
  const startPage = quotient * PAGE_LIST_SIZE + 1;

  // 끝 페이지: startPage + PAGE_LIST_SIZE - 1
  const endPage = Math.min(startPage + PAGE_LIST_SIZE - 1, totalPage);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;
  const hasPrev = page > 1;
  const hasNext = page < totalPage;

  return {
    pageList: lodash.range(startPage, endPage + 1),
    page,
    prevPage: Math.max(1, page - 1),
    nextPage: Math.min(totalPage, page + 1),
    startPage,
    lastPage: totalPage,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage,
  };
}
