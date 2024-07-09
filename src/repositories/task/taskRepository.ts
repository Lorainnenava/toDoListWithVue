import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { TaskRepositoryInterface } from "../../models/interface/repositories/task/taskRepositoryInterface";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { Task } from "../../models/task/model/taskModel";
import { Context } from "../context";

export class TaskRepository implements TaskRepositoryInterface {
  /**
   * Contexto
   */
  private readonly _context: Context = new Context();

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<Task>}
   */
  async create(
    request: TaskRequestDto,
    options?: CreateOptions
  ): Promise<Task> {
    try {
      const response = await this._context.task.create({ ...request, options });

      return response;
    } catch (error) {
      throw new Error("Error guardando una tarea");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Task[]>}
   */
  async getAll(options?: FindOptions<TaskRequestDto>): Promise<Task[]> {
    try {
      const response = await this._context.task.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todas las tareas");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Task>}
   */
  async getOne(options: FindOptions): Promise<Task | null> {
    try {
      const response = await this._context.task.findOne(options);

      if (!response) {
        return null;
      }

      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Actualizar un elemento.
   * @param options - parámetro de búsqueda.
   * @param request - datos actualizar.
   * @returns {Promise<Task>}
   */
  async update(request: TaskRequestDto, options: UpdateOptions): Promise<Task> {
    try {
      await this._context.task.update(request, options);

      const response = await this._context.task.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error actualizando una tarea");
    }
  }

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Task>}
   */
  async delete(options: UpdateOptions<TaskRequestDto>): Promise<Task> {
    try {
      await this._context.task.destroy(options);

      const response = await this._context.task.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando una tarea");
    }
  }
}
