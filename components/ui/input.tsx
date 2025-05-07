import { Input, InputProps } from '@heroui/input'
import { KeyboardEvent, forwardRef } from 'react'

type Props = {
  name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  submitOnEnter?: boolean
} & InputProps

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ name = '', formik, submitOnEnter, isClearable, ...res }, ref) => {
    const isValid = !!(formik?.touched[name] && formik?.errors[name])

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        formik?.validateForm().then(() => formik?.submitForm())
      }
    }

    return (
      <Input
        ref={ref} // Meneruskan ref ke komponen Input
        classNames={{
          input: 'font-body',
          errorMessage: 'font-body',
          base: 'font-body',
        }}
        isInvalid={isValid}
        color={isValid ? 'danger' : 'default'}
        errorMessage={formik?.errors[name]}
        onKeyDown={submitOnEnter && handleKeyPress}
        isClearable={isClearable}
        {...formik?.getFieldProps(name)}
        {...res}
      />
    )
  },
)

FormInput.displayName = 'FormInput'

export default FormInput
