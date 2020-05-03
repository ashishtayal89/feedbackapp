const filterFields = (data = {}, fields) => {
  if (data && fields.length > 0) {
    return fields.reduce((filteredData, field) => {
      filteredData[field] = data[field];
      return filteredData;
    }, {});
  }
  return null;
};

const filterListFields = (list = [], fields) =>
  list.map(item => filterFields(item, fields));

module.exports = { filterFields, filterListFields };
