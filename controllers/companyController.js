const APIError = require('../error/APIError')
const companyService = require('../services/companyService')

class CompanyController {
  async registration(req, res, next) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        role_in_hire_process,
        company_name,
        avatar,
        description,
        location,
        BIN
      } = req.body
      if (!email || !password) {
        return next(APIError.badRequest('Некорректный email или пароль'))
      }
      const companyData = await companyService.registration(email, password, firstName, lastName, role_in_hire_process, company_name, avatar, description, location, BIN)
      res.cookie('refreshToken', companyData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(companyData)
    } catch (error) {
      next(error)
    }
  }

  async authorization(req, res, next) {
    try {
      const {email, password} = req.body
      const companyData = await companyService.authorization(email, password)
      res.cookie('refreshToken', companyData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(companyData)
    } catch (error) {
      next(error)
    }
  }

  async logOut(req, res, next) {
    try {

      const {refreshToken} = req.cookies
      const token = await companyService.logOut(refreshToken)
      res.clearCookie('refreshToken')
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await companyService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const companyData = await companyService.refresh(refreshToken)
      res.cookie('refreshToken', companyData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(companyData)
    } catch (error) {
      next(error)
    }
  }

  async companies(req, res, next) {
    try {
      res.json(['123', '456'])
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new CompanyController()





