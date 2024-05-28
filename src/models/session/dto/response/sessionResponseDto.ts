import { AutoMap } from "@automapper/classes";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export class SessionResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public idUser?: number;

  @AutoMap()
  public token?: string;

  @AutoMap(() => UserResponseDto)
  public user?: UserResponseDto;
}
