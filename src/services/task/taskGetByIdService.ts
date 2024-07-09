import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskGetByIdServiceInterface } from "../../models/interface/services/task/ITaskGetByIdService";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskGetById
 * @implements {TaskGetByIdServiceInterface}
 */

@Service()
export class TaskGetByIdService implements TaskGetByIdServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la obtención de una tarea.
   * @param request - {id}
   * @returns {Promise<TaskResponseDto>}
   */
  async handle(id: number): Promise<TaskResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido");
      }

      const getTask = await this._repository.taskRepository.getOne({
        where: { id },
        transaction,
      });

      const response = mapper.map(getTask, Task, TaskResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
