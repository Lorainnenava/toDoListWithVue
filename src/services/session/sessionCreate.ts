import { validate } from "class-validator";
import { SessionCreateServiceInterface } from "../../models/interface/services/session/ISessionCreateService";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { ComparePassword } from "../../utils";
import { JwtService } from "../../utils/jwt";
import { connection } from "../../config/configDb";

/**
 * Class SessionCreate
 * @implements {SessionCreateServiceInterface}
 */
export class SessionCreateService implements SessionCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  constructor(private readonly _jwtService: JwtService) {}

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
        where: { email: request?.email, transaction },
      });

      if (!searchUser || searchUser?.code || searchUser?.state === 2) {
        throw new Error("Este usuario no existe.");
      }

      // Compara las contraseñas
      const passwordCorrect = await ComparePassword(
        request?.password!,
        searchUser?.password!
      );

      if (!passwordCorrect) {
        throw new Error("Datos inválidos.");
      }

      const existedSesion = await this._repository.sessionRepository.getOne({
        where: { idUser: searchUser?.id },
        transaction,
      });

      let session: SessionResponseDto;
      let token: string;

      if (existedSesion) {
        // Actualiza el token
        existedSesion.token = await this._jwtService.create({
          email: request?.email,
          idUser: request?.idUser,
        });

        token = existedSesion.token;

        try {
          session = await this._repository.sessionRepository.update(
            existedSesion,
            { where: { id: existedSesion?.id }, transaction }
          );
        } catch (error) {
          throw new Error("Error al actualizar la sesión");
        }
      } else {
        // Crea el token
        token = await this._jwtService.create({
          email: request?.email,
          idUser: request?.idUser,
        });

        try {
          // Crea la sesión
          session = await this._repository.sessionRepository.create(
            {
              ...request,
              token,
            },
            { transaction }
          );
        } catch (error) {
          throw new Error("Error al crear la sesión");
        }
      }

      await transaction.commit();

      return session;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
