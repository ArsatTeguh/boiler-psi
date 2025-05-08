import { Input, InputProps } from '@heroui/input'
import { FormikProps } from 'formik'
import { ChangeEvent, forwardRef } from 'react'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<Record<string, string>> | any
  type?: string // Add this line to accept the type prop
} & InputProps

// eslint-disable-next-line react/display-name
export const FormUpload = forwardRef(({ name, formik, type = 'file', ...res }: Props, ref) => {
  const isValid = !!(formik.touched[name] && formik.errors[name])

  return (
    <Input
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]

        if (file) formik.setFieldValue(name, file)
      }}
      ref={ref as never}
      isInvalid={isValid}
      color={isValid ? 'danger' : 'default'}
      errorMessage={formik.errors[name]}
      type={type}
      {...res}
    />
  )
})
