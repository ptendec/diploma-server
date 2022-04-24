const jobSeekerExperienceService = require('./../services/jobSeekerExperienceService')

class JobSeekerExperienceController {
  async create(req, res, next) {
    try {
      const {company_name, position, start_date, end_date, cv_id} = req.body
      const jobSeekerBioData = await jobSeekerExperienceService.create(company_name, position, start_date, end_date, cv_id)
      return res.json(jobSeekerBioData)
    }
    catch (error){
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const {company_name, position, start_date, end_date, cv_id, id} = req.body
      return res.json(await jobSeekerExperienceService.update(company_name, position, start_date, end_date, cv_id, id))
    }
    catch (error){
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      return res.json(await jobSeekerExperienceService.delete(id));
    }
    catch (error){
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      return res.json(await jobSeekerExperienceService.getOne(id));
    }
    catch (error){
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.json(await jobSeekerBioService.getAll())
    }
    catch (error){
      next(error)
    }
  }
}

module.exports = new JobSeekerExperienceController()
