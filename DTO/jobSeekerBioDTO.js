module.exports = class JobSeekerBioDTO {
  id;
  bio;
  age;
  location;
  quote;
  goals;
  frustrations;
  avatar;
  jobSeekerId;
  constructor(model) {
    this.id = model.id
    this.bio = model.bio
    this.age = model.age
    this.location = model.location
    this.quote = model.quote
    this.goals = model.goals
    this.frustrations = model.frustrations
    this.avatar = model.avatar
    this.jobSeekerId = model.jobSeekerId
  }
}
