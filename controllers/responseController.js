const APIError = require('../error/APIError')
const responseService = require('./../services/responseService')

class ResponseController {
  async create(req, res, next) {
    try {
      const {jobSeekerId, vacancyId} = req.body
      const vacancyData = await responseService.create(jobSeekerId, vacancyId, 'На рассмотрении')
      return res.json(vacancyData)
    }
    catch (error){
      next(error)
    }
  }

  async getMyResponses(req, res, next) {
    try {
      const {jobSeekerId} = req.params
      const vacancyData = await responseService.getMyResponses(jobSeekerId)
      return res.json(vacancyData)
    }
    catch (error){
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      return res.json(await responseService.delete(id));
    }
    catch (error){
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      return res.json(await responseService.getOne(id));
    }
    catch (error){
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.json(await responseService.getAll())
    }
    catch (error){
      next(error)
    }
  }

  async getInfoAboutVacancy(req, res, next) {
    try {
      const {vacancyId} = req.params
      return res.json(await responseService.getInfoAboutVacancy(vacancyId))
    }
    catch (error){
      next(error)
    }
  }

  async update(req, res, next){
    try {
      const {id, newStatus} = req.body
      return res.json(await responseService.update(id, newStatus))
    } catch (error){
      next(error)
    }
  }
}

module.exports = new ResponseController()
