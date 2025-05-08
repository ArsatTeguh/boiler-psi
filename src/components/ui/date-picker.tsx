import { JSX } from 'react'
import { DatePicker, DatePickerProps } from '@heroui/react'
import { parseToDateObject } from '@/utils/helpers'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
} & DatePickerProps

export default function FormDatePicker({ name = '', formik, ...res }: Props): JSX.Element {
  const isValid = !!(formik.touched[name] && formik.errors[name])

  return (
    <DatePicker
      classNames={{
        base: 'dark:bg-zinc-800',
      }}
      onChange={(date) => {
        formik.setFieldValue(name, date?.toString() || '')
      }}
      labelPlacement='outside'
      isInvalid={isValid}
      color={isValid ? 'danger' : 'default'}
      errorMessage={formik.errors[name]}
      defaultValue={formik.values[name] && parseToDateObject(formik.values[name])}
      {...res}
    />
  )
}
