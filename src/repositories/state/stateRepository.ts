import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";
import { StateRepositoryInterface } from "../../models/interface/repositories/state/stateRepositoryInterface";
import { StateRequestDto } from "../../models/state/dto/request/stateRequestDto";
import { State } from "../../models/state/model/stateModel";
import { Context } from "../context";

export class StateRepository implements StateRepositoryInterface {
  /**
   * Contexto
   */
  private readonly _context: Context = new Context();

  /**
   * Crear un elemento.
   * @param request - datos a crear.
   * @returns {Promise<State>}
   */
  async create(
    request: StateRequestDto,
    options?: CreateOptions
  ): Promise<State> {
    try {
      const response = await this._context.state.create({
        ...request,
        options,
      });

      return response;
    } catch (error) {
      throw new Error("Error guardando un estado");
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<State[]>}
   */
  async getAll(options?: FindOptions): Promise<State[]> {
    try {
      const response = await this._context.state.findAll(options);

      return response;
    } catch (error) {
      throw new Error("Error obteniendo todos los estados");
    }
  }

  /**
   * Obtener un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<State>}
   */
  async getOne(options: FindOptions): Promise<State | null> {
    try {
      const response = await this._context.state.findOne(options);

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
   * @returns {Promise<State>}
   */
  async update(
    request: StateRequestDto,
    options: UpdateOptions
  ): Promise<State> {
    try {
      await this._context.state.update(request, options);

      const response = await this._context.state.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error actualizando un estado");
    }
  }

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<State>}
   */
  async delete(options: UpdateOptions<StateRequestDto>): Promise<State> {
    try {
      await this._context.state.destroy(options);

      const response = await this._context.state.findOne(options);

      if (!response) {
        throw new Error("Elemento no encontrado");
      }

      return response;
    } catch (error) {
      throw new Error("Error eliminando un estado");
    }
  }
}
