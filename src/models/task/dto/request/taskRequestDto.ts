import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TaskRequestDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  public idUser?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public description?: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  public idState?: number;
}
