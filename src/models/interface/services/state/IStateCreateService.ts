import { StateRequestDto } from "../../../state/dto/request/stateRequestDto";
import { StateResponseDto } from "../../../state/dto/response/stateResponseDto";

export interface StateCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {StateRequestDto}
   */
  handle(request: StateRequestDto): Promise<StateResponseDto>;
}
