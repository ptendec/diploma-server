const {Response, Vacancy} = require('./../models/models')
const ResponseDTO = require('./../DTO/responseDTO')
const {JobSeeker, JobSeekerBio, CV} = require("../models/models")

class ResponseService {
  async create(jobSeekerId, vacancyId, status) {
    console.log(jobSeekerId, vacancyId)
    const response = await Response.create(
      {
        jobSeekerId, vacancyId, status
      })
    const responseDTO = new ResponseDTO(response)
    return {response: responseDTO}
  }

  async getMyResponses(jobSeekerId) {
    const response = await Response.findAll(
      {
        where: {jobSeekerId},
        include: Vacancy
      })
    const responseDTO = new ResponseDTO(response)
    return response
  }

  async delete(id) {
    const response = await Response.destroy({where: {id}})
    const responseDTO = new ResponseDTO(response)
    return {response: responseDTO}
  }

  async getOne(id) {
    const response = await Response.findByPk(id)
    const responseDTO = new ResponseDTO(response)
    return {response: responseDTO}
  }

  async getAll() {
    return await Response.findAll()
  }

  async update(id, newStatus) {
    const response = await Response.findByPk(id)
    response.status = newStatus
    return response.save()
  }

  async getInfoAboutVacancy(vacancyId) {
    console.log(vacancyId)
    const response = await Response.findAll({
      where: {vacancyId}, include: [
        {
          model: JobSeeker,
          include: [
            {
              model: JobSeekerBio,
            },
            {
              model: CV,
            }
          ]
        },
      ]
    })
    console.log(response)
    return response
  }
}

module.exports = new ResponseService()
