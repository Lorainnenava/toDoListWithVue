import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskUpdateServiceInterface } from "../../models/interface/services/task/ITaskUpdateService";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskUpdate
 * @implements {TaskUpdateServiceInterface}
 */

@Service()
export class TaskUpdateService implements TaskUpdateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la eliminación de tareas.
   * @param request - {id}
   * @returns {Promise<TaskResponseDto>}
   */
  async handle(id: number, request: TaskRequestDto): Promise<TaskResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido");
      }

      const updateTask = await this._repository.taskRepository.update(request, {
        where: { id },
        transaction,
      });

      const response = mapper.map(updateTask, Task, TaskResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
