import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "../user/userModel";

@Table({ tableName: "Sessions", timestamps: true })
/**
 * Definición de la clase Session como un modelo Sequelize
 */
export class Session extends Model {
  /**
   * Definición de la columna id
   */
  @PrimaryKey
  @Column({ type: DataTypes.INTEGER, autoIncrement: true })
  declare id?: number;

  /**
   * Definición de la columna idUser
   */
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  declare idUser?: number;

  /**
   * Definición de la columna email
   */
  @Column({ type: DataTypes.STRING })
  declare token?: string;

  /**
   * Relaciones
   */
  @BelongsTo(() => User, {})
  declare user?: User;
}
