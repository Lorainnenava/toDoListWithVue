import { StateResponseDto } from "../../../state/dto/response/stateResponseDto";

export interface StateGetAllServiceInterface {
  /**
   * Maneja la obtención de todos los elementos.
   * @param request
   */
  handle(idUser: number): Promise<StateResponseDto[]>;
}
