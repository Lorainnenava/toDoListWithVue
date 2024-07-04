import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { TaskRequestDto } from "../../../task/dto/request/taskRequestDto";
import { Task } from "../../../task/taskModel";

export interface TaskRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<Task>}
   */
  create(request: TaskRequestDto, options?: CreateOptions): Promise<Task>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task[]>}
   */
  getAll(options?: FindOptions<TaskRequestDto>): Promise<Task[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task>}
   */
  getOne(options: FindOptions<TaskRequestDto>): Promise<Task | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<Task>}
   */
  update(request: TaskRequestDto, options: UpdateOptions): Promise<Task>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Task>}
   */
  delete(options: FindOptions<TaskRequestDto>): Promise<Task>;
}
