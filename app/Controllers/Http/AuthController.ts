import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/LoginUserValidator";
import RegisterUserValidator from "App/Validators/RegisterUserValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator);
    await User.create(payload);
    return response.status(201).json({ message: "User created successfully" });
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator);
    return auth.use("api").attempt(email, password);
  }
}
