module.exports = class JobSeekerExperienceDTO {
  id;
  company_name;
  position;
  start_date;
  end_date;
  cv_id
  constructor(model) {
    this.id = model.id
    this.company_name = model.company_name
    this.position = model.position
    this.start_date = model.start_date
    this.end_date = model.end_date
    this.cv_id = model.cv_id
  }
}
