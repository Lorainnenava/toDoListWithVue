import { FindOptions, UpdateOptions } from "sequelize";
import { State } from "../../../state/stateModel";

export interface StateRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<State>}
   */
  create(request: State): Promise<State>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State[]>}
   */
  getAll(options?: FindOptions<State>): Promise<State[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State>}
   */
  getOne(options: FindOptions<State>): Promise<State | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<State>}
   */
  update(options: UpdateOptions<State>, request: State): Promise<State>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State>}
   */
  delete(options: FindOptions<State>): Promise<State>;
}
