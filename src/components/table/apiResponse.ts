export type PaginateSuccessProps<T> = {
  page: number
  per_page: number
  total_data: number
  total_page: number
  data: T
}

export type ApiResponse<T> = {
  data: T | null
  code: number
  error: boolean
  message: string
  details?: string[]
}

export interface EventResponse {
  id: string
  event_name: string
  contact_person_phone: string
  status: string

}
