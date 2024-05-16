import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

/**
 * Definición de la clase User como un modelo Sequelize
 */
@Table({ tableName: "Users", timestamps: true, paranoid: true })
export class User extends Model {
  // Definición de la columna id
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare id?: number;

  // Definición de la columna email
  @Column({ type: DataTypes.STRING })
  declare email?: string;

  // Definición de la columna password
  @Column({ type: DataTypes.STRING })
  declare password?: string;

  // Definición de la columna createdAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  declare createdAt?: Date;

  // Definición de la columna updatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  declare updatedAt?: Date;

  // Definición de la columna deletedAt para manejar eliminación lógica
  @Column({ type: DataTypes.DATE, allowNull: true })
  declare deletedAt?: Date | null;
}
