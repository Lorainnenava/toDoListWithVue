import { Transaction } from "sequelize";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserValidateServiceInterface } from "../../models/interface/services/user/IUserValidate";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

@Service()
export class UserValidateService implements UserValidateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja la validación del usuario
   * @param code
   * @param t
   * @returns {Promise<boolean>}
   */
  async handle(code: string, t?: Transaction): Promise<boolean> {
    const transaction = t ? t : await connection.transaction();

    try {
      if (!code) {
        throw new Error("El codigo es requerido.");
      }

      // Busca un usuario con este codigo
      const searchCode = await this._repository.userRepository.getOne({
        where: { code },
        transaction,
      });

      // Si no lo encuentra devuelve false
      if (!searchCode?.id) {
        return false;
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchCode, User, UserRequestDto);

      // Actualizar este usuario y habilitarlo
      await this._repository.userRepository.update(
        { ...mappedData, code: "", state: 1 },
        { where: { id: mappedData?.id }, transaction }
      );

      await transaction.commit();

      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
