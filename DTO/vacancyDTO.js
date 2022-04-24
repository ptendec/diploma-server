module.exports = class VacancyDTO {
  id;
  salary_min;
  salary_max;
  skills;
  title;
  description;
  companyId
  constructor(model) {
    this.id = model.id
    this.salary_min = model.salary_min
    this.salary_max = model.salary_max
    this.skills = model.skills
    this.title = model.title
    this.description = model.description
    this.companyId = model.companyId
  }
}
