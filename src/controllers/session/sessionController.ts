import { Body, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { ChangePasswordService } from "../../services/session/changePasswordService";
import { SessionDeleteService } from "../../services/session/deleteSessionService";
import { SessionCreateService } from "../../services/session/sessionCreateService";

@Service()
@JsonController()
export class SessionController {
  /**
   * Constructor
   * @param _sessionCreateService - {SessionCreateService}
   */
  constructor(
    private _sessionCreateService: SessionCreateService,
    private _changePasswordService: ChangePasswordService,
    private _sessionDeleteService: SessionDeleteService
  ) {}

  @Post("/login")
  async login(@Body() body: SessionRequestDto): Promise<SessionResponseDto> {
    return await this._sessionCreateService.handle(body);
  }

  @Post("/changePassword")
  async changePassword(
    @Body() body: SessionRequestDto
  ): Promise<UserResponseDto> {
    return await this._changePasswordService.handle(body);
  }

  @Post("/deleteSession/:idUser")
  async deleteSession(
    @Param("idUser") idUser: number
  ): Promise<SessionResponseDto> {
    return await this._sessionDeleteService.handle(idUser);
  }
}
