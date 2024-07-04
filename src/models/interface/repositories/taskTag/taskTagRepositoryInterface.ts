import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { TaskTagRequestDto } from "../../../taskTag/dto/request/taskTagRequestDto";
import { TaskTag } from "../../../taskTag/taskTagModel";

export interface TaskTagRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<TaskTag>}
   */
  create(request: TaskTagRequestDto, options?: CreateOptions): Promise<TaskTag>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag[]>}
   */
  getAll(options?: FindOptions<TaskTagRequestDto>): Promise<TaskTag[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag>}
   */
  getOne(options: FindOptions<TaskTagRequestDto>): Promise<TaskTag | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<TaskTag>}
   */
  update(request: TaskTag, options: UpdateOptions): Promise<TaskTag>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TaskTag>}
   */
  delete(options: FindOptions<TaskTagRequestDto>): Promise<TaskTag>;
}
