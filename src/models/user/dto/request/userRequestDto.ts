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
  @IsString()
  @IsNotEmpty()
  public userName?: string;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public password?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  public code?: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  public state?: number;
}
