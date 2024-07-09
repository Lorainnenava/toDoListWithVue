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
import { Task } from "../../task/model/taskModel";
import { TaskTag } from "../../taskTag/model/taskTagModel";
import { User } from "../../user/model/userModel";

@Table({ tableName: "Tags", timestamps: true })
/**
 * Definición de la clase Tag como un modelo Sequelize
 */
export class Tag extends Model {
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
  @Column({ type: DataTypes.INTEGER, allowNull: true })
  declare idUser?: number;

  /**
   * Definición de la columna name
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare name?: string;

  /**
   * Relación con la tabla TaskTag
   */
  @BelongsToMany(() => Task, () => TaskTag)
  @AutoMap(() => [Task])
  declare tasks?: Task[];

  /**
   * Relación con la tabla User
   */
  @BelongsTo(() => User)
  declare user?: User;
}
