const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const JobSeeker = sequelize.define('job_seeker', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, isNull: false},
  lastName: {type: DataTypes.STRING, isNull: false},
  email: {type: DataTypes.STRING, isNull: false},
  password: {type: DataTypes.STRING, isNull: false},
  isActivated: {type: DataTypes.BOOLEAN, isNull: false},
  activationLink: {type: DataTypes.STRING}
})

const TokenOfJobSeeker = sequelize.define('token_of_job_seeker', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refreshToken: {type: DataTypes.TEXT, isNull: false}
})

const CV = sequelize.define('cv', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cv_file_path: {type: DataTypes.STRING, isNull: false},
  skills: {type: DataTypes.STRING, isNull: false}
})

const JobSeekerBio = sequelize.define('job_seeker_bio', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  bio: {type: DataTypes.STRING, isNull: false},
  age: {type: DataTypes.STRING, isNull: false},
  quote: {type: DataTypes.STRING, isNull: false},
  location: {type: DataTypes.STRING, isNull: false},
  goals: {type: DataTypes.STRING, isNull: false},
  frustration: {type: DataTypes.STRING, isNull: false},
  avatar: {type: DataTypes.STRING},
  introvert: {type: DataTypes.INTEGER},
  busy: {type: DataTypes.INTEGER},
  analytical: {type: DataTypes.INTEGER},
  messy: {type: DataTypes.INTEGER},
  independent: {type: DataTypes.INTEGER},
})

const JobExperience = sequelize.define('job_experience', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  company_name: {type: DataTypes.STRING, isNull: false},
  position: {type: DataTypes.STRING, isNull: false},
  start_date: {type: DataTypes.DATE, isNull: false},
  end_date: {type: DataTypes.DATE, isNull: false},
})

const Company = sequelize.define('company', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, isNull: false},
  lastName: {type: DataTypes.STRING, isNull: false},
  email: {type: DataTypes.STRING, isNull: false},
  role_in_hire_process: {type: DataTypes.STRING, isNull: false},
  company_name: {type: DataTypes.STRING, isNull: false},
  BIN: {type: DataTypes.TEXT, isNull: false},
  location: {type: DataTypes.STRING, isNull: false},
  description: {type: DataTypes.TEXT, isNull: false},
  avatar: {type: DataTypes.STRING},
  isActivated: {type: DataTypes.BOOLEAN, isNull: false},
  activationLink: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING, isNull: false},
})

const TokenOfCompany = sequelize.define('token_of_company', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refreshToken: {type: DataTypes.TEXT, isNull: false}
})

const Vacancy = sequelize.define('vacancy', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  salary_min: {type: DataTypes.STRING, isNull: false},
  salary_max: {type: DataTypes.STRING, isNull: false},
  skills: {type: DataTypes.STRING, isNull: false},
  title: {type: DataTypes.STRING, isNull: false},
  description: {type: DataTypes.TEXT, isNull: false},
})

const Response = sequelize.define('response', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  status: {type: DataTypes.STRING, isNull: false},
})

JobSeeker.hasOne(TokenOfJobSeeker)
TokenOfJobSeeker.belongsTo(JobSeeker)

JobSeeker.hasOne(CV)
CV.belongsTo(JobSeeker)

JobSeeker.hasOne(JobSeekerBio)
JobSeekerBio.belongsTo(JobSeeker)

CV.hasMany(JobExperience)
JobExperience.belongsTo(JobSeeker)

Company.hasMany(Vacancy)
Vacancy.belongsTo(Company)

Company.hasOne(TokenOfCompany)
TokenOfCompany.belongsTo(Company)

Vacancy.hasMany(Response)
Response.belongsTo(Vacancy)

JobSeeker.hasMany(Response)
Response.belongsTo(JobSeeker)

module.exports = {
  JobSeeker,
  TokenOfJobSeeker,
  Company,
  TokenOfCompany,
  CV,
  JobSeekerBio,
  JobExperience,
  Vacancy,
  Response
}
