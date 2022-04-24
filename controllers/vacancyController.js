const APIError = require('../error/APIError')
const vacancyService = require('./../services/vacancyService')

class VacancyController {
  async create(req, res, next) {
    try {
      const {salary_min, salary_max, skills, title, description, companyId} = req.body
      const vacancyData = await vacancyService.create(salary_min, salary_max, skills, title, description, companyId)
      return res.json(vacancyData)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      return res.json(await vacancyService.delete(id));
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      return res.json(await vacancyService.getOne(id));
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.json(await vacancyService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async getAllCompanies(req, res, next) {
    try {
      const {companyId} = req.params
      console.log(companyId)
      return res.json(await vacancyService.getAllCompanies(companyId))
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new VacancyController()
