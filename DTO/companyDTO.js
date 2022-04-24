module.exports = class CompanyDTO {
  email;
  firstName;
  lastName;
  id;
  isActivated;
  role_in_hire_process;
  company_name;
  BIN;
  location;
  description;
  avatar;
  constructor(model) {
    this.email = model.email
    this.first_name = model.first_name
    this.last_name = model.last_name
    this.role = model.role
    this.id = model.id
    this.isActivated = model.isActivated
    this.role_in_hire_process = model.role_in_hire_process
    this.company_name = model.company_name
    this.BIN = model.BIN
    this.location = model.location
    this.description = model.description
    this.avatar = model.avatar
  }
}
