import { InputProps, Textarea } from "@heroui/input";
import { KeyboardEvent } from "react";

type Props = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  submitOnEnter?: boolean;
} & InputProps;

export default function FormTextarea({
  name = "",
  formik,
  submitOnEnter,
  isClearable,
  ...res
}: Props) {
  const isValid = !!(formik.touched[name] && formik.errors[name]);

  const handleKeyPress = (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.validateForm().then(() => formik.submitForm());
    }
  };

  return (
    <Textarea
      classNames={{
        input: "font-body",
        errorMessage: "font-body",
      }}
      isInvalid={isValid}
      color={isValid ? "danger" : "default"}
      errorMessage={formik.errors[name]}
      {...formik.getFieldProps(name)}
      onKeyDown={submitOnEnter ? handleKeyPress : undefined}
      {...res}
      isClearable={isClearable}
    />
  );
}
