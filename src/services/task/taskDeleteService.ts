import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskDeleteServiceInterface } from "../../models/interface/services/task/ITaskDeleteService";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskDelete
 * @implements {TaskDeleteServiceInterface}
 */

@Service()
export class TaskDeleteService implements TaskDeleteServiceInterface {
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
  async handle(id: number): Promise<TaskResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido");
      }

      const deleteTask = await this._repository.taskRepository.delete({
        where: { id },
        transaction,
      });

      const response = mapper.map(deleteTask, Task, TaskResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
