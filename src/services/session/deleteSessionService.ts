import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { SessionDeleteServiceInterface } from "../../models/interface/services/session/ISessionDeleteService";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { Session } from "../../models/session/model/sessionModel";
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

      // Busca si esta sesión existe.
      const searchSession = await this._repository.sessionRepository.getOne({
        where: { idUser },
        transaction,
      });

      if (!searchSession) {
        throw new Error("Esta sesión no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchSession, Session, SessionResponseDto);

      // Elimina la sesión.
      const deleteSession = await this._repository.sessionRepository.delete({
        where: { id: mappedData?.id },
        transaction,
      });

      await transaction.commit();

      const response = mapper.map(deleteSession, Session, SessionResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
