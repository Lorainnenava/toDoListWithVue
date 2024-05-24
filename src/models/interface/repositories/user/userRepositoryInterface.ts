import { FindOptions, UpdateOptions } from "sequelize";
import { User } from "../../../user/userModel";

export interface UserRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<User>}
   */
  create(request: User): Promise<User>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User[]>}
   */
  getAll(options?: FindOptions<User>): Promise<User[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User>}
   */
  getOne(options: FindOptions<User>): Promise<User | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<User>}
   */
  update(options: UpdateOptions<User>, request: User): Promise<User>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<User>}
   */
  delete(options: FindOptions<User>): Promise<User>;
}
