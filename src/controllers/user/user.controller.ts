import { Body, Controller, Post } from "routing-controllers";
import { UserRequestDto } from "../../models/user/dto/request/user.request.dto";
import { UserResponseDto } from "../../models/user/dto/response/user.response.dto";
import { UserCreateService } from "../../services/user/userCreate";

@Controller("/users")
export class UserController {
  /**
   * Constructor
   * @param _userCreateService {UserCreateService}
   */
  constructor(private _userCreateService: UserCreateService) {}

  @Post("/create")
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }
}
