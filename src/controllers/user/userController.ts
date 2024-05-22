import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { UserCreateService } from "../../services/user/userCreate";

@JsonController("/users")
export class UserController {
  /**
   * Constructor
   * @param _userCreateService {UserCreateService}
   */
  constructor(private _userCreateService: UserCreateService) {}

  @Post("/create")
  @OpenAPI({
    description: "List all available users",
    responses: {
      "400": {
        description: "Bad request",
      },
    },
  })
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }
}
