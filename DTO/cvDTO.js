module.exports = class CVDTO {
  id;
  cv_file_path;
  skills;
  jobSeekerId;
  constructor(model) {
    this.id = model.id
    this.cv_filePath = model.cv_filePath
    this.jobSeekerId = model.jobSeekerId
    this.skills = model.skills
  }
}
