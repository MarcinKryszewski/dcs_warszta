export default function UniqueValuesFromJson(jsonArray, value) {
  const valueArray = jsonArray.map((data) => data[value]);
  const setOfValue = new Set(valueArray);
  const uniqueValues = [...setOfValue];
  return uniqueValues;
}
