const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const {JobSeeker} = require("../models/models")
const jwt = require('jsonwebtoken')
const jobSeekerService = require('../services/jobSeekerService')
const companyService = require("../services/companyService")

class CompanyController {
  async registration(req, res, next) {
    try {
      const {email, password, firstName, lastName} = req.body
      if (!email || !password) {
        return next(APIError.badRequest('Некорректный email или пароль'))
      }
      const jobSeekerData = await jobSeekerService.registration(email, password, firstName, lastName)
      res.cookie('refreshToken', jobSeekerData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(jobSeekerData)
    } catch (error) {
      console.log(error)
    }
  }

  async authorization(req, res, next) {
    try {
      const {email, password} = req.body
      const jobSeeker = await jobSeekerService.authorization(email, password)
      res.cookie('refreshToken', jobSeeker.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(jobSeeker)
    } catch (error) {
      next(error)
    }
  }

  async logOut(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await jobSeekerService.logOut(refreshToken)
      res.clearCookie('refreshToken')
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await jobSeekerService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const jobSeekerData = await jobSeekerService.refresh(refreshToken)
      res.cookie('refreshToken', jobSeekerData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(jobSeekerData)
    } catch (error) {
      next(error)
    }
  }

  async jobSeekers(req, res, next) {
    try {
      res.json(['123', '456'])
    } catch (error) {
      console.log(error)
    }
  }

  /*    async check(req, res, next){
          const token = generateJwt(req.user.id, req.user.email, req.user.role)
          return res.json({token})
      }*/
}

module.exports = new CompanyController()





