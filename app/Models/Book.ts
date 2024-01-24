import { DateTime } from "luxon";
import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, computed, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Category from "./Category";

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public cover: string;

  @computed()
  public get coverPath() {
    return '/uploads/' + this.cover
    }

  @column()
  public author: string;

  @column()
  public resume: string;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>;
}
