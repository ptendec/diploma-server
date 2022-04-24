const {JobSeekerBio} = require('./../models/models')
const JobSeekerBioDTO = require('./../DTO/jobSeekerBioDTO')
const APIError = require('../error/APIError')

class JobSeekerBioService {
  async create(bio, age, location, quote, goals, frustration, jobSeekerId, introvert, analytical, busy, messy, independent, avatar){
    const jobSeekerBio = await JobSeekerBio.create({bio, age, location, quote, goals, frustration, jobSeekerId, introvert, analytical, busy, messy, independent, avatar})
    return {jobSeekerBio}
  }

  async update(bio, age, location, quote, goals, frustrations, avatar, jobSeekerId, id){
    const jobSeekerBio = await JobSeekerBio.update({bio, age, location, quote, goals, frustrations, avatar}, {where: {id}})
    const jobSeekerBioDTO = new JobSeekerBioDTO(jobSeekerBio)
    return {jobSeekerBio: jobSeekerBioDTO}
  }

  async delete(id){
    const jobSeekerBio = await JobSeekerBio.destroy({where: {id}})
    const jobSeekerBioDTO = new JobSeekerBioDTO(jobSeekerBio)
    return {jobSeekerBio: jobSeekerBioDTO}
  }

  async getOne(jobSeekerId){
    console.log(jobSeekerId)
    const jobSeekerBio = await JobSeekerBio.findOne({where: {jobSeekerId}})
    console.log(jobSeekerBio)
    if (!jobSeekerBio) throw APIError.badRequest("Профиль не найден")
    const jobSeekerBioDTO = new JobSeekerBioDTO(jobSeekerBio)
    return {jobSeekerBio}
  }

  async getAll(){
    const jobSeekerBio = await JobSeekerBio.findAll()
    return jobSeekerBio
  }
}

module.exports = new JobSeekerBioService()
