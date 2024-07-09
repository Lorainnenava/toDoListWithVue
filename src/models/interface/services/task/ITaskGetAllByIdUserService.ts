import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskGetAllByIdUserServiceInterface {
  /**
   * Maneja la obtención de todos los elemento.
   * @param request {idUser}
   */
  handle(idUser: number): Promise<TaskResponseDto[]>;
}
