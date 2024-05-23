import { IsNumber, IsString } from "class-validator";
import { UserRequestDto } from "../../../user/dto/request/userRequestDto";

export class SessionResponseDto {
  @IsNumber()
  public id?: number;

  @IsNumber()
  public idUser?: number;

  @IsString()
  public token?: string;

  public user?: UserRequestDto;
}
