import { AutoMap } from "@automapper/classes";

export class LabelResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public name?: string;
}
