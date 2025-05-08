import { SelectProps } from '@heroui/select'
import { Select } from '@heroui/react'
import { ReactNode } from 'react'
import { getIn } from 'formik'

type Props = {
  name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  children?: ReactNode
} & SelectProps

export default function FormMultipleSelect({ name = '', formik, children, ...res }: Props) {
  const isValid = !!(formik?.touched[name] && formik?.errors[name])

  // Get the selected values from formik
  const values: string[] = getIn(formik.values, name) ?? []

  // Update formik state when selection changes
  const handleChange = (keys: Set<string>) => {
    formik.setFieldValue(name, Array.from(keys))
  }

  // LATER FIX THIS SO values can be string[]

  return (
    <Select
      isInvalid={isValid}
      color={isValid ? 'danger' : 'default'}
      errorMessage={formik?.errors[name]}
      selectionMode='multiple'
      onSelectionChange={handleChange}
      selectedKeys={new Set(values)}
      {...formik.getFieldProps(name)}
      {...res}
    >
      {children}
    </Select>
  )
}
