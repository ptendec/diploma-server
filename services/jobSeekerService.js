const {JobSeeker} = require("../models/models")
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const JobSeekerDTO = require('../DTO/jobSeekerDTO')
const APIError = require("../error/APIError")

class JobSeekerService {
  async registration(email, password, firstName, lastName) {
    const candidate = await JobSeeker.findOne({where: {email}})
    if (candidate) {
      return APIError.badRequest('Пользователь с данным email уже существует')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const jobSeeker = await JobSeeker.create(
      {
        email,
        password: hashPassword,
        activationLink,
        firstName,
        lastName,
        isActivated: false
      })
    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/jobSeeker/activate/${activationLink}`)
    const jobSeekerDTO = new JobSeekerDTO(jobSeeker)
    const tokens = tokenService.generateToken({...jobSeekerDTO})
    await tokenService.saveToken(jobSeekerDTO.id, tokens.refreshToken, 'jobSeeker')

    return {
      ...tokens,
      jobSeeker: jobSeekerDTO
    }
  }

  async activate(activationLink) {
    const jobSeeker = await JobSeeker.findOne({where: {activationLink}})
    if (!jobSeeker) {
      return APIError.badRequest('Некорректная ссылка')
    }
    jobSeeker.isActivated = true
    await jobSeeker.save()
  }

  async authorization(email, password) {
    const jobSeeker = await JobSeeker.findOne({where: {email}})
    if (!jobSeeker) {
      return APIError.internal('Пользователь с таким именем не найден ')
    }
    let comparePassword = bcrypt.compareSync(password, jobSeeker.password)
    if (!comparePassword) {
      return APIError.internal('Указан неправильный пароль')
    }
    const jobSeekerDTO = new JobSeekerDTO(jobSeeker)
    const token = tokenService.generateToken({...jobSeekerDTO})

    await tokenService.saveToken(jobSeekerDTO.id, token.refreshToken, 'jobSeeker')
    return {...token, jobSeeker: jobSeekerDTO}
  }

  async logOut(refreshToken) {
    return await tokenService.removeJobSeekerToken(refreshToken)
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw APIError.forbidden("Не авторизован")
    }
    const jobSeekerData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findJobSeekerToken(refreshToken)
    if (!jobSeekerData || !tokenFromDB) {
      throw APIError.forbidden("Не авторизован")
    }
    const jobSeeker = await JobSeeker.findByPk(jobSeekerData.id)
    const jobSeekerDTO = new JobSeekerDTO(jobSeeker)
    const token = tokenService.generateToken({...jobSeekerDTO})

    await tokenService.saveToken(jobSeekerDTO.id, token.refreshToken, 'jobSeeker')
    return {...token, jobSeeker: jobSeekerDTO}
  }
}

module.exports = new JobSeekerService()
