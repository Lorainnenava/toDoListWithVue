import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TagGetOneServiceInterface } from "../../models/interface/services/tag/ITagGetOneService";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../models/tag/model/tagModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TagGetOne
 * @implements {TagGetOneServiceInterface}
 */

@Service()
export class TagGetOneService implements TagGetOneServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la obtención de una etiqueta por el id.
   * @param request - {TagRequestDto}
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

      const response = mapper.map(isTagExist, Tag, TagResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
