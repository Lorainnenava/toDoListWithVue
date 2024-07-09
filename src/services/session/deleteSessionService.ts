import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { SessionDeleteServiceInterface } from "../../models/interface/services/session/ISessionDeleteService";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { Session } from "../../models/session/model/sessionModel";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class SessionDeleteService
 * @implements {SessionDeleteServiceInterface}
 */

@Service()
export class SessionDeleteService implements SessionDeleteServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja el cambio de contraseña
   * @param request - {idUser}
   * @returns {Promise<SessionResponseDto>}
   */
  async handle(idUser: number): Promise<SessionResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!idUser) {
        throw new Error("El idUser es requerido.");
      }

      // Busca si este usuario existe.
      const searchUser = await this._repository.sessionRepository.getOne({
        where: { idUser },
        transaction,
      });

      if (!searchUser) {
        throw new Error("Esta usuario no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchUser, Session, SessionResponseDto);

      // Actualiza la contraseña del usuario.
      const updatePassword = await this._repository.userRepository.delete({
        where: { id: mappedData?.id },
        transaction,
      });

      await transaction.commit();

      const response = mapper.map(updatePassword, User, UserResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
