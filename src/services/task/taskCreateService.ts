import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TaskCreateServiceInterface } from "../../models/interface/services/task/ITaskCreateService";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { Task } from "../../models/task/model/taskModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TaskCreate
 * @implements {TaskCreateServiceInterface}
 */

@Service()
export class TaskCreateService implements TaskCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la creación de tareas.
   * @param request - {TaskRequestDto}
   * @returns {Promise<TaskResponseDto>}
   */
  async handle(request: TaskRequestDto): Promise<TaskResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      const createTask = await this._repository.taskRepository.create(request, {
        transaction,
      });

      const response = mapper.map(createTask, Task, TaskResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
