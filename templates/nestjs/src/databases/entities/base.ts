import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  UpdatedAt,
} from "sequelize-typescript";

export class Base<T> extends Model<T> {
  @Column({ autoIncrement: true, primaryKey: true })
  id?: number;

  @Column({ field: "created_at", allowNull: false })
  @CreatedAt
  createdAt?: Date;

  @Column({ field: "updated_at", allowNull: false })
  @UpdatedAt
  updatedAt?: Date;

  @Column({ field: "deleted_at", allowNull: true })
  @DeletedAt
  deletedAt?: Date;
}
