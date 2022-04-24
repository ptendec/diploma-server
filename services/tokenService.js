const jwt = require('jsonwebtoken')
const {TokenOfCompany, TokenOfJobSeeker} = require('./../models/models')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1d'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(id, refreshToken, type) {
    if (type === 'company') {
      const tokenData = await TokenOfCompany.findOne({where: {id}})
      if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
      }
      return await TokenOfCompany.create({companyId: id, refreshToken})
    } else {
      const tokenData = await TokenOfJobSeeker.findOne({where: {id}})
      if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
      }
      return await TokenOfJobSeeker.create({jobSeekerId: id, refreshToken})
    }
  }

  async removeCompanyToken(refreshToken) {
    return await TokenOfCompany.destroy({where: {refreshToken}})
  }

  async removeJobSeekerToken(refreshToken) {
    return await TokenOfJobSeeker.destroy({where: {refreshToken}})
  }

  async findCompanyToken(refreshToken) {
    const tokenData = await TokenOfCompany.findOne({where: {refreshToken}})
    return tokenData
  }

  async findJobSeekerToken(refreshToken) {
    const tokenData = await TokenOfJobSeeker.findOne({where: {refreshToken}})
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return data
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {

      const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return data
    } catch (error) {
      return null
    }
  }


}

module.exports = new TokenService()
