import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { StateRequestDto } from "../../../models/state/dto/request/stateRequestDto";
import { StateResponseDto } from "../../../models/state/dto/response/stateResponseDto";
import { State } from "../../../models/state/model/stateModel";

export class StateMapper {
  static defineMapper(): void {
    createMap(mapper, StateRequestDto, State);
    createMap(mapper, State, StateResponseDto);
    createMap(mapper, StateResponseDto, State);
    createMap(mapper, State, StateRequestDto);
  }
}
