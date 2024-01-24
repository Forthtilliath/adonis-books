import { DateTime } from "luxon";
import { BaseModel, ManyToMany, column, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Book from "./Book";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Book)
  public books: ManyToMany<typeof Book>;
}
