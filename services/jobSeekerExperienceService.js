const {JobExperience} = require('./../models/models')
const JobSeekerExperienceDTO = require('./../DTO/jobSeekerExperienceDTO')

class JobSeekerExperienceService {
  async create(company_name, position, start_date, end_date, cvId){
    const jobSeekerBio = await JobExperience.create({company_name, position, start_date, end_date, cvId})
    const jobSeekerExperienceDTO = new JobSeekerExperienceDTO(jobSeekerBio)
    return {jobSeekerExperience: jobSeekerExperienceDTO}
  }

  async update(company_name, position, start_date, end_date, cvId, id){
    const jobSeekerBio = await JobExperience.update({company_name, position, start_date, end_date}, {where: {id}})
    const jobSeekerExperienceDTO = new JobSeekerExperienceDTO(jobSeekerBio)
    return {jobSeekerExperience: jobSeekerExperienceDTO}
  }

  async delete(id){
    const jobSeekerBio = await JobExperience.destroy({where: {id}})
    const jobSeekerExperienceDTO = new JobSeekerExperienceDTO(jobSeekerBio)
    return {jobSeekerExperience: jobSeekerExperienceDTO}
  }

  async getOne(id){
    const jobSeekerBio = await JobExperience.findByPk(id)
    const jobSeekerExperienceDTO = new JobSeekerExperienceDTO(jobSeekerBio)
    return {jobSeekerExperience: jobSeekerExperienceDTO}
  }

  async getAll(){
    const jobSeekerExperience = await JobExperience.findAll()
    return jobSeekerExperience
  }
}

module.exports = new JobSeekerExperienceService()
