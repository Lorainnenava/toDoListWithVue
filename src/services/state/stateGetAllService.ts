import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { StateGetAllServiceInterface } from "../../models/interface/services/state/IStateGetAllService";
import { StateResponseDto } from "../../models/state/dto/response/stateResponseDto";
import { State } from "../../models/state/model/stateModel";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { User } from "../../models/user/model/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class StateGetAll
 * @implements {StateGetAllServiceInterface}
 */

@Service()
export class StateGetAllService implements StateGetAllServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja la obtención de los estados.
   * @param
   * @returns {Promise<TagResponseDto[]>}
   */
  async handle(idUser: number): Promise<TagResponseDto[]> {
    const transaction = await connection.transaction();

    try {
      const obtainsTags = await this._repository.stateRepository.getAll({
        include: [
          {
            model: Task,
            as: "tasks",
            where: { idUser },
            required: false,
            include: [
              {
                model: User,
                as: "user",
                attributes: ["id", "userName"],
                required: false,
              },
            ],
          },
        ],
        transaction,
      });

      // Convierte la data de tipo modelo a tipo response.
      const response = mapper.mapArray(obtainsTags, State, StateResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
