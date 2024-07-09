import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Service } from "typedi";
import { TaskRequestDto } from "../../models/task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../models/task/dto/response/taskResponseDto";
import { TaskChangeStateService } from "../../services/task/taskChangeStateService";
import { TaskCreateService } from "../../services/task/taskCreateService";
import { TaskDeleteService } from "../../services/task/taskDeleteService";
import { TaskGetAllByIdUserService } from "../../services/task/taskGetAllByIdUserStateService";
import { TaskGetByIdService } from "../../services/task/taskGetByIdService";
import { TaskUpdateService } from "../../services/task/taskUpdateService";

@Service()
@JsonController("/task")
export class TaskController {
  /**
   * Constructor
   * @param _taskChangeStateService - {TaskChangeStateService}
   * @param _taskCreateService - {TaskCreateService}
   * @param _taskGetAllByIdUserService - {TaskGetAllByIdUserService}
   * @param _taskDeleteService - {TaskDeleteService}
   * @param _taskUpdateService - {TaskUpdateService}
   * @param _taskGetByIdService - {TaskGetByIdService}
   */
  constructor(
    private _taskChangeStateService: TaskChangeStateService,
    private _taskCreateService: TaskCreateService,
    private _taskGetAllByIdUserService: TaskGetAllByIdUserService,
    private _taskDeleteService: TaskDeleteService,
    private _taskUpdateService: TaskUpdateService,
    private _taskGetByIdService: TaskGetByIdService
  ) {}

  @Post("/create")
  async create(@Body() body: TaskRequestDto): Promise<TaskResponseDto> {
    return await this._taskCreateService.handle(body);
  }

  @Get("/getById/:id")
  async getAllById(@Param("id") id: number): Promise<TaskResponseDto> {
    return await this._taskGetByIdService.handle(id);
  }

  @Put("/update/:id")
  async update(
    @Param("id") id: number,
    @Body() body: TaskRequestDto
  ): Promise<TaskResponseDto> {
    return await this._taskUpdateService.handle(id, body);
  }

  @Delete("/delete/:id")
  async deleteTask(@Param("id") id: number): Promise<TaskResponseDto> {
    return await this._taskDeleteService.handle(id);
  }

  @Put("/changeState/:id")
  async changeState(
    @Param("id") id: number,
    @Body() body: { idState: number }
  ): Promise<TaskResponseDto> {
    return await this._taskChangeStateService.handle(id, body?.idState);
  }

  @Get("/getAllByIdUser/:idUser")
  async getAllByIdUser(
    @Param("idUser") idUser: number
  ): Promise<TaskResponseDto[]> {
    return await this._taskGetAllByIdUserService.handle(idUser);
  }
}
