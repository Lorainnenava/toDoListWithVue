import { FindOptions, UpdateOptions } from "sequelize";
import { UserRequestDto } from "../../../user/dto/request/userRequestDto";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export interface UserRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<UserResponseDto>}
   */
  create(request: UserRequestDto): Promise<UserResponseDto>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<UserResponseDto[]>}
   */
  getAll(options?: FindOptions<UserRequestDto>): Promise<UserResponseDto[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<UserResponseDto>}
   */
  getOne(options: FindOptions<UserRequestDto>): Promise<UserResponseDto>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<UserResponseDto>}
   */
  update(
    options: UpdateOptions<UserRequestDto>,
    request: UserRequestDto
  ): Promise<UserResponseDto>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<UserResponseDto>}
   */
  delete(options: FindOptions<UserRequestDto>): Promise<UserResponseDto>;
}
