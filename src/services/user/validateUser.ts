import { Transaction } from "sequelize";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserValidateServiceInterface } from "../../models/interface/services/user/IUserValidate";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { User } from "../../models/user/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { UserMapper } from "../mapper/user/userMapper";

@Service()
export class UserValidateService implements UserValidateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  constructor() {
    UserMapper.defineMapper();
  }

  async handle(code: string, t?: Transaction): Promise<boolean> {
    const transaction = t ? t : await connection.transaction();

    try {
      const searchCode = await this._repository.userRepository.getOne({
        where: { code },
        transaction,
      });

      if (!searchCode?.id) {
        return false;
      }

      const mapperData = mapper.map(searchCode, User, UserRequestDto);

      await this._repository.userRepository.update(
        { ...mapperData, code: "", state: 1 },
        { where: { id: mapperData?.id }, transaction }
      );

      await transaction.commit();

      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
