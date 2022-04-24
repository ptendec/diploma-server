const cvService = require('./../services/cvService')
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")

class CVController {
  async create(req, res, next) {
    try {
      const {skills, jobSeekerId} = req.body
      let cv_file_path = uuid.v4() + ".png"
      const {cv} = req.files
      await cv.mv(path.resolve(__dirname, '..', 'static', 'cv', cv_file_path))
      console.log(cv_file_path, skills, jobSeekerId)
      const cvData = await cvService.create(cv_file_path, skills, jobSeekerId)
      return res.json(cvData)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const {skills, jobSeekerId} = req.body
      const {file} = req.files
      return res.json(await cvService.update(file, skills, jobSeekerId));
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      return res.json(await cvService.delete(id));
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {jobSeekerId} = req.params
      return res.json(await cvService.getOne(jobSeekerId));
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.json(await cvService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async download(req, res, next) {
    try {
      const {cv} = req.params
      const file = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'cv', cv));
      res.download(path.resolve(__dirname, '..', 'static', 'cv', cv), cv);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new CVController()
