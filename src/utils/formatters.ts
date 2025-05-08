// format currency
export const formatCurrency = (amount: number) => {
  if (amount === 0) return 'Gratis'

  return `${amount?.toLocaleString('en-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })}`
}

export function formatDateTimeToISOString(datetime: Date) {
  return datetime.toISOString().split('.')[0]
}

export function formatDateToReadableDate(dateString: string | undefined): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  // check if time part is present
  const hasTime = dateString.includes('T')

  // indonesian locale options
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const formattedDate = new Intl.DateTimeFormat('id-ID', dateOptions).format(date)

  if (hasTime) {
    const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(date)
    return `${formattedDate} ${formattedTime}`
  }

  return formattedDate
}

// export function formatDateToReadableDate(date: string) {
//   if (!date) return '-'

//   return new Date(date).toLocaleDateString('id-ID', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   })
// }
