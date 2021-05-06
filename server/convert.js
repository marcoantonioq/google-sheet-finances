/**
 * Converte um array para Objeto, sendo a primeira linha o title
 * @param {array} data Informe array de dados
 * @returns object
 */
function getJsonArrayFromData(data) {
  var obj = {};
  var result = [];
  var headers = data[0];
  var cols = headers.length;
  var row = [];

  for (var i = 1, l = data.length; i < l; i++) {
    // get a row to fill the object
    row = data[i];
    // clear object
    obj = {};
    for (var col = 0; col < cols; col++) {
      // fill object with new values
      obj[headers[col]] = row[col];
    }
    // add object in a final result
    result.push(obj);
  }

  return result;
}
