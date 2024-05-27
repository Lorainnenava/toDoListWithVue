import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "Labels", timestamps: true })
/**
 * Definición de la clase Label como un modelo Sequelize
 */
export class Label extends Model {
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
}
