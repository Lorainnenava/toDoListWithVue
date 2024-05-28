import { FindOptions, UpdateOptions } from "sequelize";
import { Tag } from "../../../tag/tagModel";

export interface TagRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<Tag>}
   */
  create(request: Tag): Promise<Tag>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag[]>}
   */
  getAll(options?: FindOptions<Tag>): Promise<Tag[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag>}
   */
  getOne(options: FindOptions<Tag>): Promise<Tag | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<Tag>}
   */
  update(options: UpdateOptions<Tag>, request: Tag): Promise<Tag>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Tag>}
   */
  delete(options: FindOptions<Tag>): Promise<Tag>;
}
