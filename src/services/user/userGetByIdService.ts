import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserGetByIdServiceInterface } from "../../models/interface/services/user/IUserGetById";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

@Service()
export class UserGetByIdService implements UserGetByIdServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja la obtención de un usuario
   * @param id
   * @returns {Promise<UserResponseDto>}
   */
  async handle(id: number): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido.");
      }

      // Busca un usuario
      const searchUser = await this._repository.userRepository.getOne({
        where: { id },
        transaction,
      });

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchUser, User, UserRequestDto);

      await transaction.commit();

      return mappedData;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
