import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskChangeStateServiceInterface } from "../../models/interface/services/task/ITaskChangeStateService";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskChange
 * @implements {TaskChangeServiceInterface}
 */

@Service()
export class TaskChangeStateService implements TaskChangeStateServiceInterface {
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
   * @param request - {TaskRequestDto}
   * @returns {Promise<TaskResponseDto>}
   */
  async handle(id: number, idState: number): Promise<TaskResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id || !idState) {
        throw new Error("El id y el idState es requerido");
      }

      const searchTask = await this._repository.taskRepository.getOne({
        where: { id },
        transaction,
      });

      if (!searchTask) {
        throw new Error("Esta tarea no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(searchTask, Task, TaskRequestDto);

      // Cambia el estado de la tarea
      const changeStateTask = await this._repository.taskRepository.update(
        { ...mappedData, idState },
        { where: { id }, transaction }
      );

      const response = mapper.map(changeStateTask, Task, TaskResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
