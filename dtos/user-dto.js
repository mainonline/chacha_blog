module.exports = class UserDto {
  email;
  id;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles;
  }
};
