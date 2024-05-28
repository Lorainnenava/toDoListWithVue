import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Tag } from "../tag/tagModel";
import { Task } from "../task/taskModel";

@Table({ tableName: "TaskTags", timestamps: true })
/**
 * Definición de la clase TaskTag como un modelo Sequelize
 */
export class TaskTag extends Model {
  /**
   * Definición de la columna id
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id?: number;

  /**
   * Definición del identificador con la tabla Tag
   */
  @AutoMap()
  @ForeignKey(() => Tag)
  @Column({ type: DataTypes.NUMBER })
  declare idTag?: number;

  /**
   * Definición del identificador con la tabla Task
   */
  @AutoMap()
  @ForeignKey(() => Task)
  @Column({ type: DataTypes.NUMBER })
  declare idTask?: number;

  /**
   * Relación con la tabla Task
   */
  @BelongsTo(() => Task, {
    foreignKey: "idTask",
  })
  @AutoMap(() => Task)
  declare task?: Task;

  /**
   * Relación con la tabla Tag
   */
  @BelongsTo(() => Tag, {
    foreignKey: "idTag",
  })
  @AutoMap(() => Tag)
  declare tag?: Tag;
}
