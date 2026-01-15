export interface BaseHit {
  objectID: string
  [key: string]: any
}

export type Hit<T = BaseHit> = T & {
  objectID: string
  __position?: number
}
