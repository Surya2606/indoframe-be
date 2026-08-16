const categoryRepository = require("../repositories/categoryRepository");

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  async createCategory(categoryData) {
    if (!categoryData.name) {
      throw { statusCode: 400, message: "Nama kategori wajib diisi!" };
    }
    return await categoryRepository.create(categoryData);
  }
}

module.exports = new CategoryService();