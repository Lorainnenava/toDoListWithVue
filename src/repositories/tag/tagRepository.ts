import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { TagRepositoryInterface } from "../../models/interface/repositories/tag/tagRepositoryInterface";
import { TagRequestDto } from "../../models/tag/dto/request/tagRequestDto";
import { Tag } from "../../models/tag/model/tagModel";
import { Context } from "../context";

export class TagRepository implements TagRepositoryInterface {
  /**
   * Contexto
   */
  private readonly _context: Context = new Context();

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<Tag>}
   */
  async create(request: TagRequestDto, options?: CreateOptions): Promise<Tag> {
    try {
      const response = await this._context.tag.create({ ...request, options });

      return response;
    } catch (error) {
      throw new Error("Error guardando una etiqueta");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Tag[]>}
   */
  async getAll(options?: FindOptions): Promise<Tag[]> {
    try {
      const response = await this._context.tag.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todas las etiquetas");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Tag>}
   */
  async getOne(options: FindOptions): Promise<Tag | null> {
    try {
      const response = await this._context.tag.findOne(options);

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
   * @returns {Promise<Tag>}
   */
  async update(request: TagRequestDto, options: UpdateOptions): Promise<Tag> {
    try {
      await this._context.tag.update(request, options);

      const response = await this._context.tag.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error actualizando una etiqueta");
    }
  }

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<Tag>}
   */
  async delete(options: UpdateOptions<TagRequestDto>): Promise<Tag> {
    try {
      await this._context.tag.destroy(options);

      const response = await this._context.tag.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando una etiqueta");
    }
  }
}
