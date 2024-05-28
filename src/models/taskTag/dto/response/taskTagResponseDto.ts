import { AutoMap } from "@automapper/classes";
import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";
import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export class TaskTagResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public idTag?: number;

  @AutoMap()
  public idTask?: number;

  @AutoMap(() => TaskResponseDto)
  public task?: TaskResponseDto;

  @AutoMap(() => TagResponseDto)
  public tag?: TagResponseDto;
}
