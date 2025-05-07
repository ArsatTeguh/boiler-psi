"use client"

import { useFormik } from "formik";
import FormInput from "../../../components/ui/input";
import { Button } from "@heroui/react";
import { categorySchema } from "../../../schema/register";

const Home =  () => {
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
     alert(JSON.stringify(values))
    },
  })

    return (
       <div className="m-16">
             <form action="" onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
             <FormInput
                formik={formik}
                name='email'
                type='email'
                variant='bordered'
                placeholder='Email'
                radius='none'
                className='dark:bg-zinc-700 dark:text-gray-100'
              />

              <FormInput
                formik={formik}
                name='password'
                type='password'
                variant='bordered'
                placeholder='Password'
                radius='none'
                className='dark:bg-zinc-700 dark:text-gray-100'
              />
              <Button isDisabled={!(formik.isValid && formik.dirty)} type="submit" color="primary">Button</Button>
             </form>
       </div>
    )
}

export default Home

 