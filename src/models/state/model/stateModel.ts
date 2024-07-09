import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "../../task/model/taskModel";

@Table({ tableName: "States", timestamps: true })
/**
 * Definición de la clase State como un modelo Sequelize
 */
export class State extends Model {
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
   * Relación con la tabla task
   */
  @HasMany(() => Task)
  @AutoMap(() => [Task])
  declare tasks?: Task[];
}
