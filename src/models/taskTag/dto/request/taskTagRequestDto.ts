import { AutoMap } from "@automapper/classes";
import { IsNumber, IsOptional } from "class-validator";

export class TaskTagRequestDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @AutoMap()
  @IsNumber()
  public idTag?: number;

  @AutoMap()
  @IsNumber()
  public idLabel?: number;
}
