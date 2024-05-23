import { FindOptions, UpdateOptions } from "sequelize";
import { SessionRequestDto } from "../../../session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../../session/dto/response/sessionResponseDto";

export interface SessionRepositoryInterface {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<SessionResponseDto>}
   */
  create(request: SessionRequestDto): Promise<SessionResponseDto>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<SessionResponseDto[]>}
   */
  getAll(
    options?: FindOptions<SessionRequestDto>
  ): Promise<SessionResponseDto[]>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<SessionResponseDto>}
   */
  getOne(options: FindOptions<SessionRequestDto>): Promise<SessionResponseDto>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<SessionResponseDto>}
   */
  update(
    options: UpdateOptions<SessionRequestDto>,
    request: SessionRequestDto
  ): Promise<SessionResponseDto>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<SessionResponseDto>}
   */
  delete(options: FindOptions<SessionRequestDto>): Promise<SessionResponseDto>;
}
