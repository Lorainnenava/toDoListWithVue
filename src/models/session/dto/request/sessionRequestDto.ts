import { AutoMap } from "@automapper/classes";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { UserRequestDto } from "../../../user/dto/request/userRequestDto";

export class SessionRequestDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public password?: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  public idUser?: number;

  @AutoMap()
  @IsString()
  @IsOptional()
  public token?: string;

  public user?: UserRequestDto;
}
