import { SelectProps } from "@heroui/select";
import { Select } from "@heroui/react";
import { ChangeEvent, ReactNode } from "react";
import { getIn } from "formik";

type Props = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  submitOnChange?: boolean;
  children?: ReactNode;
} & SelectProps;

export default function FormSelect({
  name = "",
  formik,
  submitOnChange,
  children,
  selectionMode,
  ...res
}: Props) {
  const isValid = !!(formik?.touched[name] && formik?.errors[name]);
  const value = getIn(formik.values, name) as string | string[];

  const handleKeyPress = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    formik.validateForm().then(() => formik.submitForm());
  };

  const handleChange = (keys: { currentKey: string }) => {
    formik.setFieldValue(name, keys.currentKey);

    if (submitOnChange) {
      formik.submitForm();
    }
  };

  return (
    <Select
      isInvalid={isValid}
      color={isValid ? "danger" : "default"}
      errorMessage={formik?.errors[name]}
      selectionMode={selectionMode}
      onSelectionChange={handleChange}
      selectedKeys={typeof value === "string" ? value.split(",") : value}
      onChange={(e) => {
        if (selectionMode === "multiple") {
          formik.setFieldValue(name, e.target.value.split(","));
        } else {
          formik.setFieldValue(name, e.target.value);
        }

        if (submitOnChange) {
          handleKeyPress(e);
        }
      }}
      {...formik?.getFieldProps(name)}
      {...res}
    >
      {children}
    </Select>
  );
}
