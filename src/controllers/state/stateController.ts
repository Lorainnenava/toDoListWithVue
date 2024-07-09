import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { StateGetAllService } from "../../services/state/stateGetAllService";

@Service()
@JsonController("/state")
export class StateController {
  /**
   * Constructor
   * @param _stateGetAllService - {StateGetAllService}
   */
  constructor(private _stateGetAllService: StateGetAllService) {}

  @Get("/getAllByIdUser/:idUser")
  async create(@Param("idUser") idUser: number): Promise<UserResponseDto[]> {
    return await this._stateGetAllService.handle(idUser);
  }
}
