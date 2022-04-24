const jobSeekerBioService = require('./../services/jobSeekerBioService')
const path = require("path")
const uuid = require('uuid')

class JobSeekerBioController {
  async create(req, res, next) {
    try {
      const {bio, age, location, quote, goals, frustration, jobSeekerId, introvert, analytical, busy, messy, independent} = req.body
      console.log(bio, age, location, quote, goals, frustration, jobSeekerId, introvert, analytical, busy, messy, independent)
      const {avatar} = req.files
      let fileName = uuid.v4() + ".png"
      await avatar.mv(path.resolve(__dirname, '..', 'static', 'avatarOfJobSeeker', fileName))
      const jobSeekerBioData = await jobSeekerBioService.create(bio, age, location, quote, goals, frustration, jobSeekerId, introvert, analytical, busy, messy, independent, fileName)
      return res.json(jobSeekerBioData)
    }
    catch (error){
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const {bio, age, location, quote, goals, frustrations, avatar, id} = req.body
      return res.json(await jobSeekerBioService.update(bio, age, location, quote, goals, frustrations, avatar, id));
    }
    catch (error){
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      return res.json(await jobSeekerBioService.delete(id));
    }
    catch (error){
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {jobSeekerId} = req.params
      console.log(jobSeekerId)
      return res.json(await jobSeekerBioService.getOne(jobSeekerId));
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

module.exports = new JobSeekerBioController()
