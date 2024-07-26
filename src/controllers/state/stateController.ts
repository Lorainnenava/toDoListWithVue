import {
  Authorized,
  Get,
  JsonController,
  Param,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { StateGetAllService } from "../../services/state/stateGetAllService";
import { SessionValidatorMiddleware } from "../../utils/middleware";

@Service()
@JsonController("/state")
export class StateController {
  /**
   * Constructor
   * @param _stateGetAllService - {StateGetAllService}
   */
  constructor(private _stateGetAllService: StateGetAllService) {}

  @Get("/getAllByIdUser/:idUser")
  @UseBefore(SessionValidatorMiddleware)
  @Authorized()
  async getAllByIdUser(
    @Param("idUser") idUser: number
  ): Promise<UserResponseDto[]> {
    return await this._stateGetAllService.handle(idUser);
  }
}
