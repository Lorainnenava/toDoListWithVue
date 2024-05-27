import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LabelRequestDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  public id?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name?: string;
}
