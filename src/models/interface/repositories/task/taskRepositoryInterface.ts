import { FindOptions, UpdateOptions } from "sequelize";
import { Task } from "../../../task/taskModel";

export interface TaskRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<Task>}
   */
  create(request: Task): Promise<Task>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task[]>}
   */
  getAll(options?: FindOptions<Task>): Promise<Task[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task>}
   */
  getOne(options: FindOptions<Task>): Promise<Task | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<Task>}
   */
  update(options: UpdateOptions<Task>, request: Task): Promise<Task>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task>}
   */
  delete(options: FindOptions<Task>): Promise<Task>;
}
