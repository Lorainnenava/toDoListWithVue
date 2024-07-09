import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserUpdateServiceInterface } from "../../models/interface/services/user/IUserUpdate";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

@Service()
export class UserUpdateService implements UserUpdateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja la actualización de un usuario
   * @param id
   * @param request
   * @returns {Promise<boolean>}
   */
  async handle(id: number, request: UserRequestDto): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      if (!id) {
        throw new Error("El id es requerido.");
      }

      // Busca un usuario con este id
      const searchUser = await this._repository.userRepository.getOne({
        where: { id },
        transaction,
      });

      if (!searchUser) {
        throw new Error("Este usuario no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchUser, User, UserRequestDto);

      // Actualizar este usuario y habilitarlo
      const updateUser = await this._repository.userRepository.update(request, {
        where: { id: mappedData?.id },
        transaction,
      });

      await transaction.commit();

      // Convierte la data de tipo modelo a tipo response.
      const response = mapper.map(updateUser, User, UserRequestDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
