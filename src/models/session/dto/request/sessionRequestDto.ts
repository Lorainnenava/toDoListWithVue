import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { UserRequestDto } from "../../../user/dto/request/userRequestDto";

export class SessionRequestDto {
  @IsNumber()
  public id?: number;

  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  public password?: string;

  @IsNumber()
  @IsOptional()
  public idUser?: number;

  @IsString()
  @IsOptional()
  public token?: string;

  public user?: UserRequestDto;
}
