module.exports = class VacancyDTO {
  id;
  jobSeekerId;
  vacancyId;
  status;
  constructor(model) {
    this.id = model.id
    this.jobSeekerId = model.jobSeekerId
    this.vacancyId = model.vacancyId
    this.status = model.status
  }
}
