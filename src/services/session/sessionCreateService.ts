import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { SessionCreateServiceInterface } from "../../models/interface/services/session/ISessionCreateService";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { Session } from "../../models/session/model/sessionModel";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { ComparePassword } from "../../utils";
import { JwtService } from "../../utils/jwt";

/**
 * Class SessionCreate
 * @implements {SessionCreateServiceInterface}
 */

@Service()
export class SessionCreateService implements SessionCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   * @param _jwtService - instancia de JwtService
   */
  constructor(private readonly _jwtService: JwtService) {}

  /**
   *  Maneja el inicio sesión.
   * @param request - {SessionRequestDto}
   * @returns {Promise<SessionResponseDto>}
   */
  async handle(request: SessionRequestDto): Promise<SessionResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      // Busca si este usuario existe
      const searchUser = await this._repository.userRepository.getOne({
        where: { email: request?.email },
        transaction,
      });

      // Convierte la data de tipo modelo a tipo response
      const mappedData = mapper.map(searchUser, User, UserResponseDto);

      // Si la data no viene, o tiene codigo, o el state es 2 el usuario no ha sido habilitado
      if (!mappedData || mappedData?.code || mappedData?.state === 2) {
        throw new Error("Este usuario no existe.");
      }

      // Compara las contraseñas
      const isPasswordCorrect = await ComparePassword(
        request?.password!,
        searchUser?.password!
      );

      if (!isPasswordCorrect) {
        throw new Error("La contraseña es incorrecta.");
      }

      // Verifica si ya existe una Sesion activa
      const existingSession = await this._repository.sessionRepository.getOne({
        where: { idUser: searchUser?.id },
        transaction,
      });

      let session: SessionResponseDto;
      let token: string;

      // Convierte la data de tipo modelo a tipo response
      const mappedSessionData = mapper.map(
        existingSession,
        Session,
        SessionResponseDto
      );

      // Si existe me refresca el token de lo contrario crea la sesión
      if (mappedSessionData) {
        // refresca el token
        mappedSessionData.token = await this._jwtService.create({
          email: request?.email,
          idUser: mappedData?.id,
        });

        token = mappedSessionData.token;

        try {
          // actualiza la sesión
          session = await this._repository.sessionRepository.update(
            mappedSessionData,
            {
              where: {
                id: mappedSessionData?.id,
              },
              transaction,
            }
          );
        } catch (error) {
          throw new Error("Error al actualizar la sesión");
        }
      } else {
        // Crea el token
        token = await this._jwtService.create({
          email: request?.email,
          idUser: mappedData?.id,
        });

        try {
          // Crea la sesión
          session = await this._repository.sessionRepository.create(
            {
              ...request,
              idUser: mappedData?.id,
              token,
            },
            { transaction }
          );
        } catch (error) {
          throw new Error("Error al crear la sesión");
        }
      }

      await transaction.commit();

      const response = mapper.map(session, Session, SessionResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
