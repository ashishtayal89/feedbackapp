const filterUserFields = (user, fields) => {
  if (user) {
    return fields.reduce((newUser, field) => {
      newUser[field] = user[field];
      return newUser;
    }, {});
  }
  return null;
};

module.exports = { filterUserFields };
