import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "../../task/model/taskModel";

@Table({ tableName: "Users", timestamps: true })
/**
 * Definición de la clase User como un modelo Sequelize
 */
export class User extends Model {
  /**
   * Definición de la columna id
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id?: number;

  /**
   * Definición de la columna userName
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare userName?: string;

  /**
   * Definición de la columna email
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare email?: string;

  /**
   * Definición de la columna password
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare password?: string;

  /**
   * Definición de la columna code
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING, allowNull: true })
  declare code?: string;

  /**
   * Definición de la columna state
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, defaultValue: 2 })
  declare state?: number;

  /**
   * Relación con la tabla User
   */
  @HasMany(() => Task)
  declare tasks?: Task[];
}
