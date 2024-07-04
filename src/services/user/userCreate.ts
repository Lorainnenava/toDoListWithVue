import { validate } from "class-validator";
import { Op } from "sequelize";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserCreateServiceInterface } from "../../models/interface/services/user/IUserCreateService";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { CodeRandom } from "../../utils";
import { EmailHandle } from "../../utils/services/email/emailHandle";
import { emailConfirmationTemplate } from "../../utils/template/emailConfirmationTemplate";
import { UserMapper } from "../mapper/user/userMapper";

/**
 * Class UserCreate
 * @implements {UserCreateServiceInterface}
 */
@Service()
export class UserCreateService implements UserCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  constructor(private readonly _emailHandle: EmailHandle) {
    UserMapper.defineMapper();
  }

  async handle(request: UserRequestDto): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      const exist = await this._repository.userRepository.getOne({
        where: {
          [Op.or]: [{ email: request?.email }, { userName: request?.userName }],
        },
      });

      if (exist) {
        throw new Error(
          "Ya existe un usuario con este email o nombre de usuario."
        );
      }

      const requestMapper = mapper.map(request, User, UserRequestDto);

      // Generar un código aleatorio único y verificar si ya existe en la base de datos
      let codeGenerate: string;
      let userWithCode: User | null;

      do {
        codeGenerate = CodeRandom();
        userWithCode = await this._repository.userRepository.getOne({
          where: { code: codeGenerate },
        });
      } while (userWithCode !== null);

      // Crear usuario
      const createUser = await this._repository.userRepository.create({
        ...requestMapper,
        code: codeGenerate,
      });

      // Enviar correo de confirmación de registro.
      if (createUser?.id) {
        const htmlContent = emailConfirmationTemplate(codeGenerate);

        await this._emailHandle.handleEmail({
          to: request?.email,
          subject: "Confirma tu registro en Task Tracker",
          html: htmlContent,
          attachments: [
            {
              filename: "logoToDoList.jpg",
              path: "public/logoToDoList.jpg",
              cid: "logo",
            },
          ],
        });
      }

      await transaction.commit();

      const response = mapper.map(createUser, User, UserResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
