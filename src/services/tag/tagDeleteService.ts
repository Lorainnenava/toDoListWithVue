import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TagDeleteServiceInterface } from "../../models/interface/services/tag/ITagDeleteService";
import { TagRequestDto } from "../../models/tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../models/tag/model/tagModel";
import { TaskTagRequestDto } from "../../models/taskTag/dto/request/taskTagRequestDto";
import { TaskTag } from "../../models/taskTag/model/taskTagModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TagDelete
 * @implements {TagDeleteServiceInterface}
 */

@Service()
export class TagDeleteService implements TagDeleteServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la eliminación de una etiqueta.
   * @param request - {id}
   * @returns {Promise<TagResponseDto>}
   */
  async handle(id: number): Promise<TagResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido");
      }

      const isTagExist = await this._repository.tagRepository.getOne({
        where: { id },
        transaction,
      });

      if (!isTagExist) {
        throw new Error("Esta etiqueta no existe");
      }

      // Convierte la data de tipo modelo a tipo response.
      const mappedData = mapper.map(isTagExist, Tag, TagRequestDto);

      if (mappedData?.idUser === null) {
        throw new Error(
          "Esta etiqueta no se puede eliminar ya que es propia de la app."
        );
      }

      // const deleteTask
      const searchTasks = await this._repository.taskTagRepository.getAll({
        where: { idTag: id },
        transaction,
      });

      // Convierte la data de tipo modelo a tipo response
      const mappedTask = mapper.mapArray(
        searchTasks,
        TaskTag,
        TaskTagRequestDto
      );

      // Elimina esta etiqueta de las tareas que la tengan asociada.
      if (mappedTask?.length) {
        for (const task of mappedTask) {
          await this._repository.taskTagRepository.delete({
            where: { id: task?.id },
            transaction,
          });
        }
      }

      // Elimina la etiqueta
      const deleteTag = await this._repository.tagRepository.delete({
        where: { id },
        transaction,
      });

      const response = mapper.map(deleteTag, Tag, TagResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
