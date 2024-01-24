import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import User from "App/Models/User";
import Book from "App/Models/Book";

export default class BookPolicy extends BasePolicy {
  public async update(user: User, book: Book) {
    return user.id === book.userId;
  }
  public async delete(user: User, book: Book) {
    return user.id === book.userId;
  }
}
