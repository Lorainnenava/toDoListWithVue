import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { UserRequestDto } from "../../../user/dto/request/userRequestDto";
import { User } from "../../../user/userModel";

export interface UserRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<User>}
   */
  create(request: UserRequestDto, options?: CreateOptions): Promise<User>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User[]>}
   */
  getAll(options?: FindOptions<UserRequestDto>): Promise<User[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User>}
   */
  getOne(options: FindOptions<UserRequestDto>): Promise<User | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<User>}
   */
  update(request: UserRequestDto, options: UpdateOptions): Promise<User>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User>}
   */
  delete(options: FindOptions<UserRequestDto>): Promise<User>;
}
