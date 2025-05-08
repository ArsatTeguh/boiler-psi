/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps } from "@heroui/input"
import { Checkbox } from "@heroui/checkbox"

type FormInputProps = {
  name?: string
  formik: any
  submitOnEnter?: boolean
} & InputProps

export default function FormCheckbox({ name = '', formik, ...res }: FormInputProps) {
  const isValid = !!(formik.touched[name] && formik.errors[name])

  return (
    <Checkbox
      color={isValid ? 'danger' : 'default'}
      errorMessage={formik.errors[name]}
      isInvalid={isValid}
      {...formik.getFieldProps(name)}
      {...res}
      isSelected={formik.values[name]}
    />
  )
}
