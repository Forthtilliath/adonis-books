import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Book from "App/Models/Book";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    const user = await User.query().select("id").first();
    if (!user) return;
    await Book.createMany([
      {
        title: "La Bible",
        cover: "/path/to/cover1.jpg",
        author: "Multiple auteurs",
        resume: "Un livre sacré chrétien.",
        userId: user.id,
      },
      {
        title: "Le Coran",
        cover: "/path/to/cover2.jpg",
        author: "Prophète Muhammad",
        resume: "Un livre sacré islamique.",
        userId: user.id,
      },
      {
        title: "Harry Potter",
        cover: "/path/to/cover3.jpg",
        author: "J.K. Rowling",
        resume:
          "L'histoire d'un jeune sorcier et de son amitié avec un elfe et un hibou.",
        userId: user.id,
      },
      {
        title: "Les Citations de Mao Tsé-Toung",
        cover: "/path/to/cover4.jpg",
        author: "Mao Tsé-Toung",
        resume: "Un recueil de pensées du leader communiste chinois.",
        userId: user.id,
      },
      {
        title: "Le Seigneur des Anneaux",
        cover: "/path/to/cover5.jpg",
        author: "J.R.R. Tolkien",
        resume: "Un voyage épique à travers la Terre du Milieu.",
        userId: user.id,
      },
      {
        title: "L'Alchimiste",
        cover: "/path/to/cover6.jpg",
        author: "Paulo Coelho",
        resume: "Un conte philosophique sur la quête de l'âme perdue.",
        userId: user.id,
      },
      {
        title: "Le Journal d'Anne Frank",
        cover: "/path/to/cover7.jpg",
        author: "Anne Frank",
        resume: "Un journal intime écrit pendant la Seconde Guerre mondiale.",
        userId: user.id,
      },
      {
        title: "Twilight",
        cover: "/path/to/cover8.jpg",
        author: "Stephenie Meyer",
        resume: "L'histoire d'amour entre un adolescent humain et un vampire.",
        userId: user.id,
      },
      {
        title: "Autant en emporte le vent",
        cover: "/path/to/cover9.jpg",
        author: "Margaret Mitchell",
        resume:
          "Une épopée sudiste se déroulant pendant la guerre civile américaine.",
        userId: user.id,
      },
      {
        title: "Pensez et devenez riche",
        cover: "/path/to/cover10.jpg",
        author: "Napoleon Hill",
        resume: "Un guide pratique pour atteindre la réussite financière.",
        userId: user.id,
      },
    ]);
  }
}
