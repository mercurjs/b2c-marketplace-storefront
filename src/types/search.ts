export type BaseHit = Record<string, unknown>

export type Hit<T = BaseHit> = T & {
  objectID: string
  __position?: number
}
