import { FindOptions, UpdateOptions } from "sequelize";
import { TaskTag } from "../../../taskTag/taskTagModel";

export interface TaskTagRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<TaskTag>}
   */
  create(request: TaskTag): Promise<TaskTag>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag[]>}
   */
  getAll(options?: FindOptions<TaskTag>): Promise<TaskTag[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag>}
   */
  getOne(options: FindOptions<TaskTag>): Promise<TaskTag | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<TaskTag>}
   */
  update(options: UpdateOptions<TaskTag>, request: TaskTag): Promise<TaskTag>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag>}
   */
  delete(options: FindOptions<TaskTag>): Promise<TaskTag>;
}
