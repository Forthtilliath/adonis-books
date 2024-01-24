import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        firstname: "Jane",
        lastname: "DOE",
        email: "jane@doe.fr",
        password: "totototo",
      },
      {
        firstname: "John",
        lastname: "DOE",
        email: "john@doe.fr",
        password: "totototo",
      },
    ]);
  }
}
