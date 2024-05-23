import { AutoMap } from "@automapper/classes";
import { IsNumber, IsString } from "class-validator";

export class UserResponseDto {
  @AutoMap()
  @IsNumber()
  public id?: number;

  @AutoMap()
  @IsString()
  public email?: string;

  @AutoMap()
  @IsString()
  public password?: string;
}
