import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { UserRequestDto } from "../../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../../models/user/dto/response/userResponseDto";
import { User } from "../../../models/user/userModel";

export class UserMapper {
  static defineMapper(): void {
    createMap(mapper, UserRequestDto, User);
    createMap(mapper, User, UserResponseDto);
    createMap(mapper, UserResponseDto, User);
  }
}
