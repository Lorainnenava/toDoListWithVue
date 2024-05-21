import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { UserCreateService } from "../../services/user/userCreate";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";

@JsonController("/users")
export class UserController {
  /**
   * Constructor
   * @param _userCreateService {UserCreateService}
   */
  constructor(private _userCreateService: UserCreateService) {}

  @OpenAPI({
    description: "List all available users",
    responses: {
      "400": {
        description: "Bad request",
      },
    },
  })
  @Post("/create")
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }
}
