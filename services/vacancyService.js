const {Vacancy} = require('./../models/models')
const VacancyDTO = require('./../DTO/vacancyDTO')

class VacancyService {
  async create(salary_min, salary_max, skills, title, description, companyId) {
    const vacancy = await Vacancy.create(
      {
        salary_min,
        salary_max,
        skills,
        title,
        description,
        companyId
      })
    const vacancyDTO = new VacancyDTO(vacancy)
    return {vacancy: vacancyDTO}
  }

  async delete(id) {
    const vacancy = await Vacancy.destroy({where: {id}})
    const vacancyDTO = new VacancyDTO(vacancy)
    return {vacancy: vacancyDTO}
  }

  async getOne(id) {
    const vacancy = await Vacancy.findByPk(id)
    const vacancyDTO = new VacancyDTO(vacancy)
    return {vacancy: vacancyDTO}
  }

  async getAll() {
    const vacancy = await Vacancy.findAll()
    return vacancy
  }

  async getAllCompanies(companyId) {
    const vacancies = await Vacancy.findAll({where: {companyId}})
    return vacancies
  }
}

module.exports = new VacancyService()
