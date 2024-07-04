import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { TagRequestDto } from "../../../tag/dto/request/tagRequestDto";
import { Tag } from "../../../tag/tagModel";

export interface TagRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<Tag>}
   */
  create(request: TagRequestDto, options?: CreateOptions): Promise<Tag>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag[]>}
   */
  getAll(options?: FindOptions<TagRequestDto>): Promise<Tag[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag>}
   */
  getOne(options: FindOptions<TagRequestDto>): Promise<Tag | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<Tag>}
   */
  update(request: TagRequestDto, options: UpdateOptions): Promise<Tag>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag>}
   */
  delete(options: FindOptions<TagRequestDto>): Promise<Tag>;
}
