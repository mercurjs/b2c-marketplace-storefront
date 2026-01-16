export interface BaseHit {
  title?: string
  handle?: string
  thumbnail?: string | null
}

export type Hit<T = BaseHit> = T & {
  objectID: string
  __position?: number
}
