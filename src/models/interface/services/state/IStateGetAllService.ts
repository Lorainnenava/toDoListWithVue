import { FindOptions } from "sequelize";
import { StateRequestDto } from "../../../state/dto/request/stateRequestDto";
import { StateResponseDto } from "../../../state/dto/response/stateResponseDto";

export interface StateGetAllServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {FindOptions<StateRequestDto>}
   */
  handle(request?: FindOptions<StateRequestDto>): Promise<StateResponseDto[]>;
}
