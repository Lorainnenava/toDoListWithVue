import { Body, JsonController, Post } from "routing-controllers";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { UserCreateService } from "../../services/user/userCreate";
import { Service } from "typedi";

@Service()
@JsonController("/users")
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
