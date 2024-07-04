import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { UserRepositoryInterface } from "../../models/interface/repositories/user/userRepositoryInterface";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { User } from "../../models/user/userModel";
import { Context } from "../context";

export class UserRepository implements UserRepositoryInterface {
  private readonly _context: Context = new Context();

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<User>}
   */
  async create(
    request: UserRequestDto,
    options?: CreateOptions
  ): Promise<User> {
    try {
      const response = await this._context.user.create({ ...request, options });

      return response;
    } catch (error) {
      throw new Error("Error guardando un usuario");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<User[]>}
   */
  async getAll(options?: FindOptions<UserRequestDto>): Promise<User[]> {
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
   * @returns {Promise<User>}
   */
  async getOne(options: FindOptions): Promise<User | null> {
    try {
      const response = await this._context.user.findOne(options);

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
   * @returns {Promise<User>}
   */
  async update(request: UserRequestDto, options: UpdateOptions): Promise<User> {
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
   * @returns {Promise<User>}
   */
  async delete(options: UpdateOptions<UserRequestDto>): Promise<User> {
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
