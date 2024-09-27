import { regex } from '@/utils/regex'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

/**
 * schema
 */
const schema = yup.object({
  email: yup.string().email().required('Campo requerido'),
  password: yup
    .string()
    .required('Campo requerido')
    .matches(regex.onlyNumbers.execute, regex.onlyNumbers.message)
})

export function useLoginForm() {
  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema
  })

  const handleClick = () => {
    console.log('hola')
  }

  return {
    handleSubmit,
    handleClick,
    schema,
    resetForm
  }
}
