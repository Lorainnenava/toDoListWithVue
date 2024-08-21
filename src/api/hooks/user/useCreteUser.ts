import { useMutation } from 'vue-query'
import { UserRequestDto } from '../../dtos/user/userRequestDto'
import { createUserApi } from '../../services/user/createUser'

/**
 * Hook para crear un usuario.
 */
export const useCreateUser = () => {
  /**
   * Función que llama a la API para crear un usuario.
   * @param userData - Datos del usuario.
   */
  return useMutation((userData: UserRequestDto) => createUserApi(userData))
}
