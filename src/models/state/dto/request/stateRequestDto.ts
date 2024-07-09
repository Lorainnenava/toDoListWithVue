import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class StateRequestDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name?: string;
}
