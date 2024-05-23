import { FindOptions, UpdateOptions } from "sequelize";
import { SessionRepositoryInterface } from "../../models/interface/repositories/session/sessionRepositoryInterface";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { context } from "../context";

export class SessionRepository implements SessionRepositoryInterface {
  /**
   * Instancia del Contexto
   */
  private _context = context;

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<SessionResponseDto>}
   */
  async create(request: SessionRequestDto): Promise<SessionResponseDto> {
    try {
      const response = await this._context.session.create({ request });

      return response;
    } catch (error) {
      throw new Error("Error guardando una sesión");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<SessionResponseDto[]>}
   */
  async getAll(options?: FindOptions): Promise<SessionResponseDto[]> {
    try {
      const response = await this._context.session.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todas las sesiones");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<SessionResponseDto>}
   */
  async getOne(options: FindOptions): Promise<SessionResponseDto> {
    try {
      const response = await this._context.session.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error obteniendo una sesión");
    }
  }

  /**
   * Actualizar un elemento.
   * @param options - parámetro de búsqueda.
   * @param request - datos actualizar.
   * @returns {Promise<SessionResponseDto>}
   */
  async update(
    options: UpdateOptions<SessionRequestDto>,
    request: SessionRequestDto
  ): Promise<SessionResponseDto> {
    try {
      await this._context.session.update(request, options);

      const response = await this._context.session.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error actualizando una sesión");
    }
  }

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<SessionResponseDto>}
   */
  async delete(options: UpdateOptions): Promise<SessionResponseDto> {
    try {
      await this._context.session.destroy(options);

      const response = await this._context.session.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando una sesión");
    }
  }
}
