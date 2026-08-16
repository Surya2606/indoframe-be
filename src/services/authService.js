const userRepository = require("../repositories/userRepository");

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw { statusCode: 400, message: "Email sudah terdaftar!" };
    }

    // Disini tempat hash password (misal pakai bcrypt)
    return await userRepository.create(userData);
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: "Email atau password salah!" };
    }

    // Disini tempat verifikasi password & buat JWT Token
    return { user, token: "MOCK_JWT_TOKEN_HERE" };
  }
}

module.exports = new AuthService();
