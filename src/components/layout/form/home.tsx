"use client";

import { useFormik } from "formik";

import { Button, SelectItem } from "@heroui/react";
import FormInput from "../../ui/input";
import FormSelect from "@/components/ui/select";
import FormTextarea from "@/components/ui/textarea";
import FormDatePicker from "@/components/ui/date-picker";
import { withAuth } from "@/utils/withAuth";
import { categorySchema } from "@/schema/register";


const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "snake", label: "Snake" },
];

const Home = () => {
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      category: "",
      description: "",
      time:""
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div className="m-16">
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4"
      >
        <FormInput
          formik={formik}
          name="email"
          type="email"
          variant="bordered"
          placeholder="Email"
          radius="none"
          className="dark:bg-zinc-700 dark:text-gray-100"
        />

        <FormInput
          formik={formik}
          name="password"
          variant="bordered"
          placeholder="Password"
          radius="none"
          className="dark:bg-zinc-700 dark:text-gray-100"
          type="password"
        />

        <FormSelect
          labelPlacement="outside"
          aria-label="category-field"
          placeholder="Pilih kategori..."
          variant="flat"
          radius="lg"
          name="category"
          // isLoading={}
          formik={formik}
        >
          {animals.map((e) => (
            <SelectItem key={e.key}>{e.label}</SelectItem>
          ))}
        </FormSelect>

        <FormTextarea
          label="Deskripsi Pekerjaan"
          labelPlacement="outside"
          aria-label="desc-field"
          placeholder="Ketikkan deskripsi..."
          variant="bordered"
          radius="lg"
          name="description"
          description="Informasi ini bisa diakses oleh umum"
          formik={formik}
        />

          <FormDatePicker 
          name='time'
          formik={formik}
          className=""
          />

        <Button
          isDisabled={!(formik.isValid && formik.dirty)}
          type="submit"
          color="primary"
        >
          Button
        </Button>
      </form>
    </div>
  );
};

export default withAuth(['visitor', 'admin'], Home) 
