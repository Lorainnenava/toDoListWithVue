import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { StateRequestDto } from "../../../state/dto/request/stateRequestDto";
import { State } from "../../../state/model/stateModel";

export interface StateRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<State>}
   */
  create(request: StateRequestDto, options?: CreateOptions): Promise<State>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State[]>}
   */
  getAll(options?: FindOptions<StateRequestDto>): Promise<State[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State>}
   */
  getOne(options: FindOptions<StateRequestDto>): Promise<State | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<State>}
   */
  update(request: StateRequestDto, options: UpdateOptions): Promise<State>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<State>}
   */
  delete(options: FindOptions<StateRequestDto>): Promise<State>;
}
