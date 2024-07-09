import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { Context } from "../context";
import { TaskTagRepositoryInterface } from "../../models/interface/repositories/taskTag/taskTagRepositoryInterface";
import { TaskTag } from "../../models/taskTag/model/taskTagModel";
import { TaskTagRequestDto } from "../../models/taskTag/dto/request/taskTagRequestDto";

export class TaskTagRepository implements TaskTagRepositoryInterface {
  /**
   * Contexto
   */
  private readonly _context: Context = new Context();

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<TaskTag>}
   */
  async create(
    request: TaskTagRequestDto,
    options?: CreateOptions
  ): Promise<TaskTag> {
    try {
      const response = await this._context.taskTag.create({
        ...request,
        options,
      });

      return response;
    } catch (error) {
      throw new Error("Error guardando una tarea");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<TaskTag[]>}
   */
  async getAll(options?: FindOptions<TaskTagRequestDto>): Promise<TaskTag[]> {
    try {
      const response = await this._context.taskTag.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todas las tareas");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<TaskTag>}
   */
  async getOne(options: FindOptions): Promise<TaskTag | null> {
    try {
      const response = await this._context.taskTag.findOne(options);

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
   * @returns {Promise<TaskTag>}
   */
  async update(
    request: TaskTagRequestDto,
    options: UpdateOptions
  ): Promise<TaskTag> {
    try {
      await this._context.task.update(request, options);

      const response = await this._context.taskTag.findOne(options);

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
   * @returns {Promise<TaskTag>}
   */
  async delete(options: UpdateOptions<TaskTagRequestDto>): Promise<TaskTag> {
    try {
      await this._context.task.destroy(options);

      const response = await this._context.taskTag.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando una tarea");
    }
  }
}
