"use client";

import FormInput from "@/components/ui/input";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/register";
import { addToast, Button } from "@heroui/react";
import { LoginUser } from "./actions";
import { useUserContext } from "@/provider/user-context";

export default function Login() {
  const user = useUserContext();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await LoginUser(values);
      if (res.data == null) {
        addToast({
          title: res.message,
          description: "Please Enter right",
          color: "danger",
          timeout: 2500,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>{JSON.stringify(user)}</p>
      <FormInput
        formik={formik}
        name="email"
        type="email"
        variant="bordered"
        placeholder="Email"
        radius="none"
        className="dark:bg-zinc-700 dark:text-gray-100"
      />
      <Button
        isDisabled={!(formik.isValid && formik.dirty)}
        type="submit"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
}
