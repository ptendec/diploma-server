const {CV} = require('./../models/models')
const CVDTO = require('./../DTO/cvDTO')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const APIError = require("../error/APIError")

class CVService {
  async create(cv_file_path, skills, jobSeekerId){
    const cv = await CV.create({cv_file_path, skills, jobSeekerId})
    return {cv}
  }

  async update(file, skills, jobSeekerId){
    const check = await CV.findOne({where: {jobSeekerId}})
    fs.unlinkSync(path.join(__dirname, '..', 'static', 'cv', check.cv_file_path))
    const fileName = uuid.v4() + '.png'
    await file.mv(path.join(__dirname, '..', 'static', 'cv', fileName))
    const cv = await CV.update({cv_file_path: fileName, skills, }, {where: {jobSeekerId}})
    const cvDTO = new CVDTO(cv)
    return {cv: cvDTO}
  }

  async delete(id){
    const cv = await CV.destroy({where: {id}})
    const cvDTO = new CVDTO(cv)
    return {cv: cvDTO}
  }

  async getOne(jobSeekerId){
    const cv = await CV.findOne({where: {jobSeekerId}})
    if (!cv) throw APIError.badRequest("Профиль не найден")
    return {cv}
  }

  async getAll(){
    const cv = await CV.findAll()
    return cv
  }
}

module.exports = new CVService()
