import { Op } from "sequelize";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TagGetAllByUserServiceInterface } from "../../models/interface/services/tag/ITagGetAllByUserService";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../models/tag/model/tagModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TagGetAllByIdUserService
 * @implements {TagGetAllByUserServiceInterface}
 */

@Service()
export class TagGetAllByIdUserService
  implements TagGetAllByUserServiceInterface
{
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la obtención de de etiquetas por usuario.
   * @param request - {TagRequestDto}
   * @returns {Promise<TagResponseDto>}
   */
  async handle(idUser: number): Promise<TagResponseDto[]> {
    const transaction = await connection.transaction();

    try {
      if (!idUser) {
        throw new Error("El idUser es requerido.");
      }

      const searchTags = await this._repository.tagRepository.getAll({
        where: {
          [Op.or]: [{ idUser: idUser }, { idUser: { [Op.is]: null } }],
        },
      });

      const response = mapper.mapArray(searchTags, Tag, TagResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
