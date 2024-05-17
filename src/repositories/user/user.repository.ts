import { FindOptions, UpdateOptions } from "sequelize";
import { UserRequestDto } from "../../models/user/dto/request/user.request.dto";
import { UserResponseDto } from "../../models/user/dto/response/user.response.dto";
import { Context } from "../context";
import { UserRepositoryInterface } from "../../models/interface/repositories/user/userRepository.interface";

export class UserRepository implements UserRepositoryInterface {
  constructor(private _context: Context) {}

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<UserResponseDto>}
   */
  async create(request: UserRequestDto): Promise<UserResponseDto> {
    try {
      const response = await this._context.user.create({ request });

      return response;
    } catch (error) {
      throw new Error("Error guardando un usuario");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<UserResponseDto[]>}
   */
  async getAll(options?: FindOptions): Promise<UserResponseDto[]> {
    try {
      const response = await this._context.user.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todos los usuarios");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<UserResponseDto>}
   */
  async getOne(options: FindOptions): Promise<UserResponseDto> {
    try {
      const response = await this._context.user.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error obteniendo un usuario");
    }
  }

  /**
   * Actualizar un elemento.
   * @param options - parámetro de búsqueda.
   * @param request - datos actualizar.
   * @returns {Promise<UserResponseDto>}
   */
  async update(
    options: UpdateOptions,
    request: UserRequestDto
  ): Promise<UserResponseDto> {
    try {
      await this._context.user.update(request, options);

      const response = await this._context.user.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error actualizando un usuario");
    }
  }

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<UserResponseDto>}
   */
  async delete(options: UpdateOptions): Promise<UserResponseDto> {
    try {
      await this._context.user.destroy(options);

      const response = await this._context.user.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando un usuario");
    }
  }
}
