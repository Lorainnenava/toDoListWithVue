import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Task } from "../task/taskModel";
import { TaskTag } from "../taskTag/taskTagModel";

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
}
