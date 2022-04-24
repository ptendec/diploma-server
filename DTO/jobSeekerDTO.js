module.exports = class JobSeekerDTO {
    email;
    firstName;
    lastName;
    id;
    isActivated;
    avatar;
    constructor(model) {
        this.email = model.email
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.id = model.id
        this.isActivated = model.isActivated
        this.avatar = model.avatar
    }
}
