const {Company} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const CompanyDTO = require('../DTO/companyDTO')
const APIError = require('../error/APIError')

class CompanyService {
  async registration(email, password, firstName, lastName, role_in_hire_process, company_name, avatar, description, location, BIN) {
    const candidate = await Company.findOne({where: {email}})
    if (candidate) {
      throw APIError.badRequest('Пользователь с данным email уже существует')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const company = await Company.create(
      {
        email,
        password: hashPassword,
        activationLink,
        firstName,
        lastName,
        role_in_hire_process,
        company_name,
        BIN,
        location,
        description,
        avatar,
        isActivated: false
      })
    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/company/activate/${activationLink}`)

    const companyDTO = new CompanyDTO(company)
    const tokens = tokenService.generateToken({...companyDTO})

    await tokenService.saveToken(companyDTO.id, tokens.refreshToken, 'company')
    return {
      ...tokens,
      company: companyDTO
    }
  }

  async activate(activationLink) {
    const company = await Company.findOne({where: {activationLink}})
    if (!company) {
      return APIError.badRequest('Некорректная ссылка')
    }
    company.isActivated = true
    await company.save()
  }

  async authorization(email, password) {
    const company = await Company.findOne({where: {email}})
    if (!company) {
      return APIError.internal('Пользователь с таким именем не найден ')
    }
    let comparePassword = bcrypt.compareSync(password, company.password)
    if (!comparePassword) {
      return APIError.internal('Указан неправильный пароль')
    }
    const companyDTO = new CompanyDTO(company)
    const token = tokenService.generateToken({...companyDTO})

    await tokenService.saveToken(companyDTO.id, token.refreshToken, 'company')
    return {...token, company: companyDTO}
  }

  async logOut(refreshToken) {
    return await tokenService.removeCompanyToken(refreshToken)
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return APIError.forbidden('Не авторизован')
    }
    const companyData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findCompanyToken(refreshToken)
    if (!companyData || !tokenFromDB) {
      return APIError.forbidden('Не авторизован')
    }
    const company = await Company.findByPk(companyData.id)
    const companyDTO = new CompanyDTO(company)
    const token = tokenService.generateToken({...companyDTO})

    await tokenService.saveToken(companyDTO.id, token.refreshToken, 'company')
    return {...token, company: companyDTO}
  }
}

module.exports = new CompanyService()
