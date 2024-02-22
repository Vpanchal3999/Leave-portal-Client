import { SortingOrder } from "./constant"

export class pageRequest {
    pageNumber!:number
    itemPerPage!:number
    sortingField!: string
    sortingOrder!:SortingOrder
}

export class PageResponseVo {
    totalPage?: number
    itemPerPage?: number
    totalItem?: number
    pages?: Object
}