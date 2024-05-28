import { TaskTagRequestDto } from "../../../taskTag/dto/request/taskTagRequestDto";
import { TaskTagResponseDto } from "../../../taskTag/dto/response/taskTagResponseDto";

export interface TaskTagCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {TaskTagRequestDto}
   */
  handle(request: TaskTagRequestDto): Promise<TaskTagResponseDto>;
}
