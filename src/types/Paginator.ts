export default interface Paginator {
    path: string
    previousPageUrl: string | null
    firstPageUrl: string
    currentPage: number
    lastPageUrl: string
    nextPageUrl: string
    first: number
    last: number
    lastPage: number
    links: []
    perPage: number
    total: number
  } 