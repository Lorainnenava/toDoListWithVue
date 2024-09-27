import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { UserCreateService } from "../../services/user/userCreateService";
import { UserGetByIdService } from "../../services/user/userGetByIdService";
import { UserUpdateService } from "../../services/user/userUpdateService";
import { UserValidateService } from "../../services/user/validateUserService";
import { SessionValidatorMiddleware } from "../../utils/middleware";
import { OpenAPI } from "routing-controllers-openapi";

@Service()
@JsonController("/user")
export class UserController {
  /**
   * Constructor
   * @param _userCreateService - {UserCreateService}
   * @param _userValidateService - {UserValidateService}
   * @param _userGetByIdService - {UserGetByIdService}
   * @param _userUpdateService - {UserUpdateService}
   */
  constructor(
    private _userCreateService: UserCreateService,
    private _userValidateService: UserValidateService,
    private _userGetByIdService: UserGetByIdService,
    private _userUpdateService: UserUpdateService
  ) {}

  @Post("/create")
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }

  @Post("/validateUser/:code")
  async validateUser(@Param("code") code: string): Promise<boolean> {
    return await this._userValidateService.handle(code);
  }

  @Get("/getById/:id")
  @OpenAPI({ security: [{ bearerAuth: [] }] })
  @UseBefore(SessionValidatorMiddleware)
  async getById(@Param("id") id: number): Promise<UserResponseDto> {
    return await this._userGetByIdService.handle(id);
  }

  @Put("/update/:id")
  async update(
    @Param("id") id: number,
    @Body() body: UserRequestDto
  ): Promise<UserResponseDto> {
    return await this._userUpdateService.handle(id, body);
  }
}
