module.exports = class UserDto {
  id;
  name;
  email;
  image;
  roles;
  layoutId;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.image = model.image;
    this.roles = model.roles;
    this.layoutId = model.layoutId;
  }
};
