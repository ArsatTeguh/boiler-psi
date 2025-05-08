import { FormEvent } from 'react'
import { parseDate, parseAbsoluteToLocal } from '@internationalized/date'

export function parseToBase64(value: string): string {
  return Buffer.from(value).toString('base64')
}

export function formatDate(date: string): string {
  return date?.split(' ')[0] || 'n/a'
}

export function onlyNumeric(e: FormEvent<HTMLInputElement>): string {
  const res = e.currentTarget.value.match(/[^0-9.]/g)

  if (res) {
    return (e.currentTarget.value = e.currentTarget.value.replace(res[0], ''))
  }

  return ''
}

export function onlyNik(e: React.FormEvent<HTMLInputElement>): string {
  const input = e.currentTarget
  const value = input.value

  // Remove non-numeric characters (except for the decimal point)
  const res = value.match(/[^0-9.]/g)
  if (res) {
    input.value = value.replace(res[0], '')
  }

  // Limit the input to a maximum of 16 characters
  if (input.value.length > 16) {
    input.value = input.value.slice(0, 16)
  }

  return input.value
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.slice(1)
}

export function nl2br(str: string, is_xhtml?: boolean): string {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }

  const breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>'

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

export function parseFormDataToObject(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = {}

  if (formData.entries()) {
    formData.forEach((value: FormDataEntryValue, key: string) => {
      body[key] = value
    })

    return body
  }

  return {}
}

export function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export function parseToDateObject(dateStr: string) {
  if (!dateStr) return ''

  return parseDate(dateStr)
}

export function parseToDateTimeObject(dateStr: string) {
  if (!dateStr) return ''

  return parseAbsoluteToLocal(dateStr + 'Z')
}

export function getPeriod() {
  const time: number = new Date().getHours()

  switch (true) {
    case time > 0 && time <= 11:
      return 'Good Morning'
    case time > 11 && time <= 14:
      return 'Good Day'
    case time > 14 && time <= 18:
      return 'Good Afternoon'
    case (time > 18 && time <= 24) || time === 0:
      return 'Good Night'
    default:
      return ''
  }
}

// for removing nullish values in object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeNullishFromObject(object: Record<string, any>) {
  for (const key in object) {
    if (object[key] === null || object[key] === '' || object[key] === undefined) {
      delete object[key]
    }
  }

  return object
}
