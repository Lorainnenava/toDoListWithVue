import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskGetAllByIdUserServiceInterface } from "../../models/interface/services/task/ITaskGetAllByIdUserService";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskGetAllByIdUser
 * @implements {TaskGetAllByIdUserServiceInterface}
 */

@Service()
export class TaskGetAllByIdUserService
  implements TaskGetAllByIdUserServiceInterface
{
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maneja el cambia del estado de la tarea
   * @param request - {idUser}
   * @returns {Promise<TaskResponseDto>}
   */
  async handle(idUser: number): Promise<TaskResponseDto[]> {
    const transaction = await connection.transaction();

    try {
      if (!idUser) {
        throw new Error("El idUser es requerido.");
      }

      const searchTasks = await this._repository.taskRepository.getAll({
        where: { idUser },
        transaction,
      });

      // Convierte la data de tipo modelo a tipo response.
      const response = mapper.mapArray(searchTasks, Task, TaskRequestDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
