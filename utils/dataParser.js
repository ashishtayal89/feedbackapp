const filterDataFields = (data = {}, fields) => {
  if (data && fields.length > 0) {
    return fields.reduce((filteredData, field) => {
      filteredData[field] = data[field];
      return filteredData;
    }, {});
  }
  return null;
};

const filterDataListFields = (list = [], fields) =>
  list.map(item => filterDataFields(item, fields));

module.exports = { filterDataFields, filterDataListFields };
