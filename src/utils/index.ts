import { regex } from './regex'
import { TValidations } from './types'

/**
 * Transforma una cadena de texto en mayúsculas.
 * @param value
 * @returns String
 */
export const upperCase = (value: string) => `${value || ''}`.toUpperCase()

/**
 * Transforma una cadena de texto en minúsculas.
 * @param value
 * @returns String
 */
export const lowercase = (value: string) => `${value || ''}`.toLowerCase()

/**
 * Maneja las validaciones de los inputs
 * @function handleValidation
 * @param validations
 * @param value
 * @returns
 */
export const handleValidation = (
  validations: TValidations,
  e: Event
): string[] | string | undefined => {
  // Obtener el valor real
  const inputValue = (e.target as HTMLInputElement).value

  let errors: string[] = []
  let transform: string | undefined = undefined

  for (const [key, validation] of Object.entries(validations)) {
    switch (key) {
      case 'max':
        if (typeof validation === 'number' && inputValue?.length > validation) {
          errors = [...errors, `Maximum length is ${validation}`]
        }
        break
      case 'onlyLetters':
        if (validation && !regex?.onlyLetters?.execute.test(inputValue)) {
          errors = [...errors, regex?.onlyLetters?.message]
        }
        break
      case 'alphanumeric':
        if (validation && !regex?.alphanumeric?.execute.test(inputValue)) {
          errors = [...errors, regex?.alphanumeric?.message]
        }
        break
      case 'noSpaces':
        if (validation && !regex?.noSpaces?.execute.test(inputValue)) {
          errors = [...errors, regex?.noSpaces?.message]
        }
        break
      case 'onlyPositive':
        if (
          !regex?.onlyPositiveNumbers?.execute?.test(inputValue) &&
          validations?.onlyPositive &&
          inputValue
        )
          errors = [...errors, regex?.noSpaces?.message]
        break

      case 'onlyNumbers':
        if (regex?.onlyNumbers?.execute?.test(inputValue)) {
          errors = [...errors, regex?.onlyNumbers?.message]
        }
        break
      case 'upperCase':
        transform = upperCase(inputValue)
        break
      case 'lowerCase':
        transform = lowercase(inputValue)
        break
    }
  }

  return errors?.length > 0 ? errors : transform
}
