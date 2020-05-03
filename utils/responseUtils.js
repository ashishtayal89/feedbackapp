const filterFields = (data = {}, fields) => {
  if (data && fields.length > 0) {
    return fields.reduce((filteredData, field) => {
      filteredData[field] = data[field];
      return filteredData;
    }, {});
  }
  return null;
};

module.exports = { filterFields };
