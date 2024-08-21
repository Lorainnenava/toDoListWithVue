import { API_BASE_URL } from '@/utils/apiConfig'
import axios from 'axios'
import { UserRequestDto } from '../../dtos/user/userRequestDto'
import { UserResponseDto } from '../../dtos/user/userResponseDto'

// Función para crear un usuario
export const createUserApi = async (userData: UserRequestDto): Promise<UserResponseDto> => {
  try {
    // Envía una solicitud POST para crear un usuario
    const response = await axios.post(`${API_BASE_URL}/user/create`, userData)

    // Retorna los datos de la respuesta
    return response?.data
  } catch (error) {
    console.log(error, 'error')
    // Lanza un error si ocurre un problema
    throw new Error('Ha ocurrido una incidencia.')
  }
}
