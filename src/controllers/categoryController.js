const categoryService = require("../services/categoryService");

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({ status: "success", data: categories });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const newCategory = await categoryService.createCategory(req.body);
      res.status(201).json({ status: "success", data: newCategory });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();