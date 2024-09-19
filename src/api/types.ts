export type ActionType = {
  type: string /* "documents_v2" */
  docType?: string/* "SELL" */
  period?:
    {
      dateStart: number /* 1726430400429 */
      dateEnd: number/* 1726508738429 */
    } | null
    value?: string | null
    storeUuid?: string
    body?: any
    cursor?: unknown
    id?: string
    employee_id?: string | null
}
