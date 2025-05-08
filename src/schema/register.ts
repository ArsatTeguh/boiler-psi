import * as yup from "yup";

export const categorySchema = yup.object({
  email: yup.string().required("Email Harus diisi"),
  password: yup.string().required("Password tidak boleh kosong"),
  category: yup.string().optional(),
});

export type CategorySchema = yup.InferType<typeof categorySchema>;

export const loginSchema = yup.object({
  email: yup.string().required("Email Harus diisi"),
});

export type LoginSchema = yup.InferType<typeof categorySchema>;
