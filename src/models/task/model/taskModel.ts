import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { State } from "../../state/model/stateModel";
import { Tag } from "../../tag/model/tagModel";
import { TaskTag } from "../../taskTag/model/taskTagModel";
import { User } from "../../user/model/userModel";

@Table({ tableName: "Tasks", timestamps: true })
/**
 * Definición de la clase Task como un modelo Sequelize
 */
export class Task extends Model {
  /**
   * Definición de la columna id
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id?: number;

  /**
   * Definición del identificador con la tabla User
   */
  @AutoMap()
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  declare idUser?: number;

  /**
   * Definición del identificador con la tabla State
   */
  @AutoMap()
  @ForeignKey(() => State)
  @Column({ type: DataTypes.INTEGER })
  declare idState?: number;

  /**
   * Definición de la columna name
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare name?: string;

  /**
   * Definición de la columna description
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare description?: string;

  /**
   * Relación con la tabla User
   */
  @BelongsTo(() => User)
  declare user?: User;

  /**
   * Relación con la tabla State
   */
  @BelongsTo(() => State)
  declare state?: State;

  /**
   * Relación con la tabla TaskTag
   */
  @BelongsToMany(() => Tag, () => TaskTag)
  @AutoMap(() => [Tag])
  declare tags?: Tag[];
}
