import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../user/userModel";
import { Label } from "../label/labelModel";

@Table({ tableName: "Taks", timestamps: true })
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
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  declare idUser?: number;

  /**
   * Definición del identificador con la tabla Label
   */
  @ForeignKey(() => Label)
  @Column({ type: DataTypes.INTEGER })
  declare idLabel?: number;

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
   * Definición de la columna status
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER })
  declare status?: string;

  /**
   * Relación con la tabla User
   */
  @BelongsTo(() => User, { foreignKey: "idUser" })
  declare user?: User;

  /**
   * Relación con la tabla Label
   */
  @BelongsTo(() => Label)
  declare label?: Label;
}
