import { AutoMap } from "@automapper/classes";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UserRequestDto {
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
}
