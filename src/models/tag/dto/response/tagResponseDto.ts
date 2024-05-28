import { AutoMap } from "@automapper/classes";
import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export class TagResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public name?: string;

  @AutoMap(() => [TaskResponseDto])
  declare tasks?: TaskResponseDto[];
}
