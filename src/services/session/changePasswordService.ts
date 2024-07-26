import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { ChangePasswordServiceInterface } from "../../models/interface/services/session/IChangePasswordService";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { EncryptPassword } from "../../utils";

/**
 * Class ChangePassword
 * @implements {ChangePasswordServiceInterface}
 */

@Service()
export class ChangePasswordService implements ChangePasswordServiceInterface {
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
   * @param request - {SessionRequestDto}
   * @returns {Promise<UserResponseDto>}
   */
  async handle(request: SessionRequestDto): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes.
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      // Busca si este usuario existe.
      const searchUser = await this._repository.userRepository.getOne({
        where: { email: request?.email },
        transaction,
      });

      if (!searchUser) {
        throw new Error("Esta usuario no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchUser, User, UserResponseDto);

      // Encripta la nueva contraseña.
      const encryptPassword = await EncryptPassword(request?.password ?? "");

      // Actualiza la contraseña del usuario.
      const updatePassword = await this._repository.userRepository.update(
        { ...mappedData, password: encryptPassword },
        { where: { id: mappedData?.id }, transaction }
      );

      await transaction.commit();

      const response = mapper.map(updatePassword, User, UserResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
