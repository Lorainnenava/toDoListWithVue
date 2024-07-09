import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { TaskRequestDto } from "../../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../../models/task/dto/response/taskResponseDto";
import { Task } from "../../../models/task/model/taskModel";

export class TaskMapper {
  static defineMapper(): void {
    createMap(mapper, TaskRequestDto, Task);
    createMap(mapper, Task, TaskResponseDto);
    createMap(mapper, TaskResponseDto, Task);
    createMap(mapper, Task, TaskRequestDto);
  }
}
