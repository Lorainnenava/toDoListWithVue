import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "taks", timestamps: true })
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
   * Definición de la columna email
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare nombre?: string;

  /**
   * Definición de la columna password
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare idEtiqueta?: string;
}
