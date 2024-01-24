import Application from "@ioc:Adonis/Core/Application";
import Mail from "@ioc:Adonis/Addons/Mail";
import Drive from "@ioc:Adonis/Core/Drive";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Book from "App/Models/Book";
import StoreBookValidator from "App/Validators/StoreBookValidator";
import UpdateBookValidator from "App/Validators/UpdateBookValidator";

export default class BookController {
  public async index({}: HttpContextContract) {
    return Book.query()
      .preload("user", (user) => user.select("firstname", "lastname"))
      .preload("categories", (categ) => categ.select("id", "name"))
      .select("title", "author", "user_id", "id");
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreBookValidator);
    await payload.cover.moveToDisk("./");
    const fileName = payload.cover.fileName;
    const book = await Book.create({
      ...payload,
      cover: fileName,
      userId: auth.user!.id,
    });
    await book.related("categories").attach(payload.categories);
    await book.load("categories");
    await Mail.send((message) => {
      message
        .from("bookapi@example.com")
        .to(auth.user!.email)
        .subject("Thanks for adding a new book to our API!")
        // .html("<h1>Thanks for adding a new book to our API! 🎊</h1>")
        .attach(Application.tmpPath(book.coverPath))
        .htmlView("emails/create", { book });
    });
    return response
      .status(201)
      .json({ message: "Book created successfully", book });
  }

  public async show({ request }: HttpContextContract) {
    return Book.findOrFail(request.param("id"));
  }

  public async update({ bouncer, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateBookValidator);
    const book = await Book.findOrFail(request.param("id"));
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    await bouncer.with("BookPolicy").authorize("update", book);

    let fileName: string | undefined;
    if (payload.cover) {
      await Drive.delete(book.cover);
      await payload.cover.moveToDisk("./");
      fileName = payload.cover.fileName;
    }
    const updatedBook = await book
      .merge({
        ...payload,
        cover: fileName,
      })
      .save();

    await updatedBook.related("categories").sync(payload.categories);

    return response.status(200).json({ message: "Book updated successfully" });
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(request.param("id"));
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    await bouncer.with("BookPolicy").authorize("delete", book);

    await Drive.delete(book.cover);
    await book.related("categories").detach();
    await book.delete();

    return response.status(200).json({ message: "Book deleted successfully" });
  }
}
