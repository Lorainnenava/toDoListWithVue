import { Body, JsonController, Post } from "routing-controllers";
import { SessionRequestDto } from "../../models/session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/response/sessionResponseDto";
import { SessionCreateService } from "../../services/session/sessionCreate";

@JsonController()
export class SessionController {
  /**
   * Constructor
   * @param _sessionCreateService {SessionCreateService}
   */
  constructor(private _sessionCreateService: SessionCreateService) {}

  @Post("/login")
  async login(@Body() body: SessionRequestDto): Promise<SessionResponseDto> {
    return await this._sessionCreateService.handle(body);
  }
}
