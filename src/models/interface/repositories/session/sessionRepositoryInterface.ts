import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { SessionRequestDto } from "../../../session/dto/request/sessionRequestDto";
import { Session } from "../../../session/sessionModel";

export interface SessionRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<Session>}
   */
  create(request: SessionRequestDto, options?: CreateOptions): Promise<Session>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Session[]>}
   */
  getAll(options?: FindOptions<SessionRequestDto>): Promise<Session[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Session>}
   */
  getOne(options: FindOptions<SessionRequestDto>): Promise<Session>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<Session>}
   */
  update(request: SessionRequestDto, options: UpdateOptions): Promise<Session>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<Session>}
   */
  delete(options: FindOptions<SessionRequestDto>): Promise<Session>;
}
