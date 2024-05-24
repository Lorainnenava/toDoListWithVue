import { Body, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { UserCreateService } from "../../services/user/userCreate";
import { UserValidateService } from "../../services/user/validateUser";

@Service()
@JsonController("/users")
export class UserController {
  /**
   * Constructor
   * @param _userCreateService {UserCreateService}
   */
  constructor(
    private _userCreateService: UserCreateService,
    private _userValidateService: UserValidateService
  ) {}

  @Post("/create")
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }

  @Post("/validateUser")
  async validateUser(@Param("code") code: string): Promise<boolean> {
    return await this._userValidateService.handle(code);
  }
}
