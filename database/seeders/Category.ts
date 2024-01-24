import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Category from "App/Models/Category";

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { name: "Fiction" },
      { name: "Non-Fiction" },
      { name: "Biography" },
      { name: "History" },
      { name: "Children's Literature" },
      { name: "Poetry" },
      { name: "Drama" },
      { name: "Thriller" },
      { name: "Horror" },
      { name: "Science Fiction" },
      { name: "Romance" },
      { name: "Mystery" },
      { name: "Cooking" },
      { name: "Health" },
      { name: "Travel" },
    ]);
  }
}
