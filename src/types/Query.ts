export default interface Query {
  order?: {
    dir: string
    field: string
  }[]
  filter?: {
    key: string
    op: string
    value: any
  }[]
  page?: {
    size: number
    number: number
  }
}
