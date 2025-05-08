import { RadioGroup, RadioGroupProps } from '@heroui/react'
import { ReactNode } from 'react'

type Props = {
  name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  submitOnChange?: boolean
  children?: ReactNode
} & RadioGroupProps

export default function FormRadioGroup({ name = '', formik, children, ...res }: Props) {
  const isValid = !!(formik?.touched[name] && formik?.errors[name])

  return (
    <RadioGroup
      classNames={{ label: 'text-foreground' }}
      color={isValid ? 'danger' : 'default'}
      errorMessage={formik.errors[name]}
      isInvalid={isValid}
      orientation='horizontal'
      {...formik.getFieldProps(name)}
      {...res}
    >
      {children}
    </RadioGroup>
  )
}
